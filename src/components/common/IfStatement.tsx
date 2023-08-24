import {ReactNode} from "react";

export type IfProps = {
    condition: boolean
    render?: ReactNode
    elseRender?: ReactNode
    children?: ReactNode
}

export const If = ({
                       condition,
                       render,
                       elseRender,
                       children
                   }: IfProps) => {
    return (<>
        {!condition && elseRender &&
            <>
                {elseRender}
            </>
        }
        {condition &&
            <>
                {children &&
                    <>{ children }</>
                }
                {!children && render &&
                    <>{ render }</>
                }
            </>
        }
    </>)
}