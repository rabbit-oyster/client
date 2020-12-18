import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Button, Grid } from 'semantic-ui-react'
import styles from 'styled-components'
import Pageable from 'pageable'
import { motion } from 'framer-motion'
import { disableBodyScroll } from 'body-scroll-lock'
import Message from '../components/Message'
import MessageList from '../components/MessageList'

const Section = styles.section`
  height: 100vh;
`
export default function Main () {
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(null)
  useEffect(() => {
    const p = new Pageable('#main', {
      animation: 500,
      autoInitialize: false
    })
    setPages(p)
    disableBodyScroll(document.querySelector('#root'))
    p.on('init', e => {
      setPage(e.index)
    })
    p.on('scroll.start', e => {
      setPage(e.index)
    })
  }, [])
  return (
    <>
      <Container textAlign='center' style={{ height: '100vh', width: '100%', background: '#fefefe' }} id='main'>
        <Section id='hero' style={{ textAlign: 'center', paddingTop: '30vh' }} currentPage={page} data-anchor='hero'>
          <Header as='h1' style={{ fontSize: '7vh' }}>마음의 숲</Header>
          <h2><Icon name='quote left' />자신도 몰랐던 자신의 마음 속을 들여다보세요.<Icon name='quote right' /></h2>
          <div style={{ minHeight: '2vh' }} />
          <Button size='large' href='#about' circular>
            더 알아보기
          </Button>
        </Section>
        <Section
          id='about' style={{ background: '#f6f6f6' }} currentPage={page} destroyPageable={() => {
            if (pages) {
              pages.destroy()
            }
          }}
          data-anchor='about'
        >
          <Container textAlign='center'>
            <Grid stackable>
              <Grid.Column mobile={16} computer={8}>
                <div className='device iphone-x' style={{ transform: 'scale(0.5)' }} textAlign='center'>
                  <div className='notch'>
                    <div className='camera' />
                    <div className='speaker' />
                  </div>
                  <div className='top-bar' />
                  <div className='sleep' />
                  <div className='bottom-bar' />
                  <div className='volume' />
                  <div className='inner-shadow' />
                  <div className='screen example-1'>
                    <br /><br />

                    <MessageList style={{ padding: '0 10px' }}>
                      <Message>요즘 고민이 있으세요?</Message>
                      <Message self>네... 요즘 학교생활이 힘들어요</Message>
                      <Message self>어떻게 할지 모르겠어요.</Message>
                      <Message self>어떻게 하면 좋을까요?</Message>
                      <Message>당신은 소중한 사람이에요.</Message>
                      <Message>화이팅하세요!</Message>
                      <Message>상담이 필요하시다면 집 근처 <br />"서울특별시 동작구 보건소"를 소개해드릴게요!</Message>
                    </MessageList>

                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} computer={8} textAlign='center' style={{ padding: '25vh 0' }}>
                <Header as='h2' style={{ fontSize: '4vh' }}>고민이 있으세요?</Header>
                <h3>AI를 통한 우울증 진단으로 마음의 병을 <br />미리 진단하고, 자살을 예방합니다.</h3><br />
                <Button icon labelPosition='right' color='blue' size='large' as={Link} to='/chatBot' circular>
                  검사받기
                  <Icon name='arrow right' />
                </Button>
              </Grid.Column>
            </Grid>
          </Container>
        </Section>
        <Section id='github' style={{ textAlign: 'center', padding: '25vh 0' }} currentPage={page} data-anchor='github'>
          <Header as='h2' style={{ fontSize: '4vh' }}>오픈소스</Header>
          <h3>모든 소스코드는 Github에 공개되어있습니다.</h3>
          <Button className='github'>프론트앤드</Button>
          <Button className='github'>백앤드</Button>
        </Section>
      </Container>
    </>
  )
}
