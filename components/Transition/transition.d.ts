import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';
declare type TransitionProps = {
    animation?: AnimationName;
    wrapper?: boolean;
} & CSSTransitionProps;
declare const Transition: React.FC<TransitionProps>;
export default Transition;
