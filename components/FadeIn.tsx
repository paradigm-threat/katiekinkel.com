'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { clsx } from 'clsx'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function FadeIn({
  className,
  delay = 0,
  children,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      className={clsx(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
