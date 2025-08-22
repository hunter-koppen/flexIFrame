import { createElement } from "react";

import { IFrameComponent } from "./components/IFrame";
import "./ui/FlexIFrame.css";

export function FlexIFrame(props) {
    const {
        url,
        width,
        height,
        title,
        messageToSend,
        messageReceived,
        onMessageReceived,
        allow,
        referrerPolicy,
        sandbox,
        loading
    } = props;

    const handleMessageReceived = message => {
        if (messageReceived) {
            messageReceived.setValue(message);
        }
        if (onMessageReceived) {
            onMessageReceived.execute();
        }
    };

    return (
        <IFrameComponent
            url={url.value}
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
        />
    );
}
