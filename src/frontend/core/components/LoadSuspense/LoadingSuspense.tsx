import { Box } from '@chakra-ui/react'
import styles from './LoadingSuspense.module.css'

export default function LoadingSuspense({ color }: { color?: string }) {
    const bottom_color = color ? `3px solid ${color} !important` : ''
    const right_color = color ? `3px solid ${color} !important` : ''
    const top_color = color ? `3px solid ${color} !important` : ''
    return (
        <div className={styles.containerLoader}>
            <div className={styles.loader}>
                <Box className={`${styles.inner} ${styles.one}`} borderBottom={bottom_color} ></Box>
                <Box className={`${styles.inner} ${styles.two}`} borderRight={right_color}></Box>
                <Box className={`${styles.inner} ${styles.three}`} borderTop={top_color}></Box>
            </div>
        </div>

    )
}