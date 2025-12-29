import { createElement } from "react";

import { IFrameComponent } from "./components/IFrame";
import "./ui/FlexIFrame.css";

export function FlexIFrame(props) {
    const {
        url,
        html,
        additionalStylesheet,
        type,
        width,
        height,
        title,
        messageToSend,
        onMessageReceived,
        allow,
        referrerPolicy,
        sandbox,
        loading,
        onLoad
    } = props;

    const handleMessageReceived = message => {
        if (onMessageReceived) {
            const value = typeof message === "object" ? JSON.stringify(message) : message;
            onMessageReceived.execute({
                messageReceived: value
            });
        }
    };

    const handleLoad = () => {
        if (onLoad) {
            onLoad.execute();
        }
    };

    return (
        <IFrameComponent
            url={type === "url" ? url?.value : undefined}
            html={type === "html" ? html?.value : undefined}
            additionalStylesheet={additionalStylesheet?.value}
            type={type}
            title={title?.value || "flex-iframe"}
            width={width?.value || "100%"}
            height={height?.value || "100%"}
            messageToSend={messageToSend}
            onMessage={handleMessageReceived}
            classNames={props.class}
            allow={allow}
            referrerPolicy={referrerPolicy}
            sandbox={sandbox}
            loading={loading}
            onLoad={handleLoad}
        />
    );
}
