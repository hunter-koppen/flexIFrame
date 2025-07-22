import { createElement } from "react";

import { IFrameComponent } from "./components/IFrameComponent";
import "./ui/FlexIFrame.css";

export function FlexIFrame({ url }) {
    return <IFrameComponent url={url} />;
}
