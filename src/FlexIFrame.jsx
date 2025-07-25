import { createElement } from "react";

import { IFrameComponent } from "./components/IFrame";
import "./ui/FlexIFrame.css";

export function FlexIFrame({ className, url, width, height, messageToSend, messageReceived, onMessageReceived }) {
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
            width={width?.value || "100%"}
            height={height?.value || "100%"}
            messageToSend={messageToSend}
            onMessage={handleMessageReceived}
            classNames={className}
        />
    );
}
