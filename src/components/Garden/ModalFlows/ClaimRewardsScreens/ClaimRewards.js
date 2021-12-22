import React, { useEffect } from 'react'

import { useMultiModal } from '@components/MultiModal/MultiModalProvider'

const ClaimRewards = React.memo(function ClaimRewards({ getTransactions }) {
  const { next } = useMultiModal()

  useEffect(() => {
    getTransactions(() => {
      next()
    })
  }, [getTransactions, next])

  return <div />
})

export default ClaimRewards
