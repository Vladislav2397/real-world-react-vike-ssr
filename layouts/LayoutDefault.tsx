import React from 'react'

import './style.css'
import './icons.css'
import { TheHeader } from '@/widgets/TheHeader/TheHeader'
import { TheFooter } from '@/widgets/TheFooter'

const LayoutDefault: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <TheHeader />
            {children}
            <TheFooter />
        </div>
    )
}

export default LayoutDefault
