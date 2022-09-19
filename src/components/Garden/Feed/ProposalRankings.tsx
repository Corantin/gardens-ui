import React, { useCallback } from 'react'
import { GU, textStyle, useTheme } from '@1hive/1hive-ui'
import { useAppTheme } from '@providers/AppTheme'

import iconTopSvg from '@images/icons/base/rankings/ranking-top.svg'
import iconTopSelectedSvg from '@images/icons/base/rankings/ranking-top-selected.svg'
import iconNewSvg from '@images/icons/base/rankings/ranking-new.svg'
import iconNewSelectedSvg from '@images/icons/base/rankings/ranking-new-selected.svg'

// DarkMode svg
import iconTopSvgDarkMode from '@images/icons/dark-mode/ranking-top.svg'
import iconTopSelectedSvgDarkMode from '@images/icons/dark-mode/ranking-top-selected.svg'
import iconNewSvgDarkMode from '@images/icons/dark-mode/ranking-new.svg'
import iconNewSelectedSvgDarkMode from '@images/icons/dark-mode/ranking-new-selected.svg'

const iconsMapping: {
  [x: string]: {
    icon: any
    iconSelected: any
    label: string
  }
} = {
  top: {
    icon: '/icons/rankings/ranking-top.svg',
    iconSelected: '/icons/rankings/ranking-top-selected.svg',
    label: 'Most supported',
  },
  new: {
    icon: '/icons/rankings/ranking-new.svg',
    iconSelected: '/icons/rankings/ranking-new-selected.svg',
    label: 'Newest',
  },
}

const iconsMappingDarkMode: {
  [x: string]: {
    icon: any
    iconSelected: any
    label: string
  }
} = {
  top: {
    icon: iconTopSvgDarkMode,
    iconSelected: iconTopSelectedSvgDarkMode,
    label: 'Most supported',
  },
  new: {
    icon: iconNewSvgDarkMode,
    iconSelected: iconNewSelectedSvgDarkMode,
    label: 'Newest',
  },
}

function getRankingIcon(key: any, selected: any, mappingType: any) {
  return mappingType[key][selected ? 'iconSelected' : 'icon']
}

function getRankingLabel(key: string) {
  return iconsMapping[key].label
}

type ItemProps = {
  icon: any
  index: number
  label: string
  onSelect: (index: number) => void
  selected: boolean
}

type ProposalRankingsProps = {
  items: Array<string>
  onChange: () => void
  selected?: number
}

function ProposalRankings({
  items,
  onChange,
  selected,
}: ProposalRankingsProps) {
  const appearance = useAppTheme()
  const mappingType =
    appearance.appearance === 'light' ? iconsMapping : iconsMappingDarkMode

  return (
    <div
      css={`
        display: flex;
        align-items: center;
        position: relative;
        z-index: 3;
      `}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          icon={getRankingIcon(item, selected === index, mappingType)}
          index={index}
          label={getRankingLabel(item)}
          onSelect={onChange}
          selected={selected === index}
        />
      ))}
    </div>
  )
}

function Item({ icon, index, label, onSelect, selected }: ItemProps) {
  const theme = useTheme()

  const handleOnClick = useCallback(() => {
    onSelect(index)
  }, [index, onSelect])

  return (
    <div
      css={`
        display: flex;
        align-items: center;
        color: ${theme.accentContent};
        margin-right: ${1 * GU}px;
        border-radius: ${2 * GU}px;
        padding: ${0.5 * GU}px ${0.75 * GU}px;
        background: linear-gradient(
          268deg,
          ${theme.accentEnd},
          ${theme.accentStart}
        );

        ${!selected &&
        `
          background: ${theme.surface};
          color: ${theme.contentSecondary};
          cursor: pointer;
          border: 1px solid ${theme.border};
          &:hover {
            background: linear-gradient(268.53deg, rgba(170, 245, 212, 0.2) 0%, rgba(124, 224, 214, 0.2) 100%);
          }
        `}
      `}
      onClick={handleOnClick}
    >
      <img src={icon} height="22" width="22" alt="" />
      <div
        css={`
          ${textStyle('label1')};
          margin-left: ${0.75 * GU}px;
        `}
      >
        {label}
      </div>
    </div>
  )
}

export default ProposalRankings
