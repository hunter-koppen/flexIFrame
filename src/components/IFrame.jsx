import { createElement, useRef, useEffect } from "react";

export function IFrameComponent({
    classNames,
    url,
    html,
    additionalStylesheet,
    type,
    width,
    height,
    title,
    messageToSend,
    onMessage,
    allow,
    referrerPolicy,
    sandbox,
    loading
}) {
    const iframeRef = useRef(null);

    const buildHtmlWithStylesheet = (rawHtml, href) => {
        if (!rawHtml || !href) {
            return rawHtml;
        }

        const linkTag = `<link rel="stylesheet" href="${href}">`;

        if (/<head[^>]*>/i.test(rawHtml)) {
            return rawHtml.replace(/<head([^>]*)>/i, `<head$1>${linkTag}`);
        }

        if (/<html[^>]*>/i.test(rawHtml)) {
            return rawHtml.replace(/<html([^>]*)>/i, `<html$1><head>${linkTag}</head>`);
        }

        if (/<body[^>]*>/i.test(rawHtml)) {
            return rawHtml.replace(/<body([^>]*)>/i, `<head>${linkTag}</head><body$1>`);
        }

        return `<head>${linkTag}</head>${rawHtml}`;
    };

    useEffect(() => {
        if (messageToSend?.value && iframeRef.current && url) {
            try {
                const targetOrigin = new URL(url).origin;
                iframeRef.current.contentWindow.postMessage(messageToSend.value, targetOrigin);
            } catch (error) {
                console.error("Invalid URL provided, cannot post message:", url, error);
            }
        }
    }, [messageToSend, url]);

    useEffect(() => {
        if (!url) {
            return;
        }

        let expectedOrigin;
        try {
            expectedOrigin = new URL(url).origin;
        } catch (error) {
            // if the url is not valid, we can't check the origin, so we shouldn't listen for messages
            console.error("Invalid URL provided to IFrameComponent:", url, error);
            return;
        }

        const handleMessage = event => {
            if (event.origin === expectedOrigin) {
                if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
                    console.log("Received message from iframe:", event.data);
                    onMessage(event.data);
                }
            }
        };

        window.addEventListener("message", handleMessage);

        // eslint-disable-next-line consistent-return
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [url, onMessage]);

    return (
        <iframe
            ref={iframeRef}
            className={classNames ? `flex-iframe ${classNames}` : "flex-iframe"}
            src={type === "url" ? url : undefined}
            srcDoc={type === "html" ? buildHtmlWithStylesheet(html, additionalStylesheet) : undefined}
            title={title}
            style={{ width, height }}
            allow={allow}
            referrerPolicy={referrerPolicy}
            sandbox={sandbox}
            loading={loading}
        />
    );
}
