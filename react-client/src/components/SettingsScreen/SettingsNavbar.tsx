import { Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { History } from 'history'
import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  margin-left: -20px;

  .SettingsNavbar-title {
    line-height: 56px;
  }

  .SettingsNavbar-back-button {
    color: var(--primary-text);
  }

  .SettingsNavbar-picture {
    height: 40px;
    width: 40px;
    margin-top: 3px;
    margin-left: -22px;
    object-fit: cover;
    padding: 5px;
    border-radius: 50%;
  }
`
interface SettingsNavbarProps {
  history: History
}

export default ({ history }: SettingsNavbarProps) => {
  const navToChats = () => {
    history.push('/chats')
  }

  return (
    <Style className={name}>
      <Button className="SettingsNavbar-back-button" onClick={navToChats}>
        <ArrowBack />
      </Button>
    </Style>
  )
}
