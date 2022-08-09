import React from 'react'
import { LayoutProps } from '../../models/layout'

const LayoutNone = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LayoutNone