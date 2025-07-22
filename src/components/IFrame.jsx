import { createElement } from "react";

export function IFrameComponent({ url }) {
    return <iframe src={url} title="iframe" style={{ width: "100%", height: "100%", border: "none" }} />;
}
