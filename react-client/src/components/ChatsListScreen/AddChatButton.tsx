import React from 'react'
import { Button } from '@material-ui/core'
import { Chat as ChatIcon } from '@material-ui/icons'
import { History } from 'history'
import styled from 'styled-components'

const Style = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;

  button {
    mid-width: 50px;
    width: 50px;
    height: 50px;
    border-radius: 999px;
    background-color: var(--secondary-bg);
    color: white;
  }
`

interface AddChatButtonProps {
  history: History
}

export default ({ history }: AddChatButtonProps) => {
  const onClick = () => {
    history.push('/new-chat')
  }

  return (
    <Style className="AddChatButton">
      <Button variant="contained" color="secondary" onClick={onClick}>
        <ChatIcon />
      </Button>
    </Style>
  )
}
