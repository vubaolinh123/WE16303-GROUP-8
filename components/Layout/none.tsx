import React from 'react'
import { LayoutProps } from '../../models/layout'
import 'antd/dist/antd.css';

const LayoutNone = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LayoutNone