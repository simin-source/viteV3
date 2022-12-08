import { HTMLAttributes, SetupContext } from 'vue';

import button from './Button.module.scss';

interface ButtonProps extends  HTMLAttributes {
    className?: string;
}
export default function (props: ButtonProps, { slots }: SetupContext) {
    console.log(props);

    return <div class={`${button} ${props.className}`} style={props.style}>
        {slots.default?.()}
    </div>;
}