import { createElement, useRef, useEffect } from "react";

export function IFrameComponent({ className, url, width, height, messageToSend, onMessage }) {
    const iframeRef = useRef(null);

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
            className={"flex-iframe " + className}
            src={url}
            title="iframe"
            style={{ width, height, border: "none" }}
        />
    );
}
