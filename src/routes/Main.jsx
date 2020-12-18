import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Button, Grid } from 'semantic-ui-react'
import styles from 'styled-components'
import ScrollAnimation from 'react-animate-on-scroll'
import { motion } from 'framer-motion'
import Message from '../components/Message'
import MessageList from '../components/MessageList'

const Section = styles.section`
  height: 100vh;
  scroll-snap-align: start;
`
export default function Main () {
  return (
    <>
      <Container textAlign='center' style={{ height: '100vh', width: '100%', background: '#fefefe', overflowY: 'scroll', scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}>
        <Section id='hero' style={{ minHeight: '100vh', textAlign: 'center', paddingTop: '30vh' }}>
          <Header as='h1' style={{ fontSize: '7vh' }}>마음의 숲</Header>
          <h2><Icon name='quote left' />자신도 몰랐던 자신의 마음 속을 들여다보세요.<Icon name='quote right' /></h2>
          <div style={{ minHeight: '2vh' }} />
          <Button icon labelPosition='right' color='blue' size='large' as={Link} to='/chatBot'>
            검사받기
            <Icon name='arrow right' />
          </Button>

          <Button icon labelPosition='right' size='large' href='#about'>
            더 알아보기
            <Icon name='arrow right' />
          </Button>
        </Section>
        <Section id='about' style={{ minHeight: '100vh' }}>
          <Container textAlign='center'>
            <Grid stackable>
              <Grid.Column mobile={16} computer={8}>
                <ScrollAnimation animateIn='fadeIn'>
                  <p><MessageList><Message type='solo' self>고민이 있으세요?</Message></MessageList></p>
                </ScrollAnimation>
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

                    <MessageList>
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
              <Grid.Column mobile={16} computer={8} textAlign='center'>
                <ScrollAnimation animateIn='fadeIn'>
                  <MessageList>
                    <Message>요즘 고민이 있으세요?</Message>
                    <Message self>네... 요즘 학교생활이 힘들어요</Message>
                    <Message self>어떻게 할지 모르겠어요.</Message>
                    <Message self>어떻게 하면 좋을까요?</Message>
                    <Message>당신은 소중한 사람이에요.</Message>
                    <Message>화이팅하세요!</Message>
                    <Message>상담이 필요하시다면 집 근처 <br />"서울특별시 동작구 보건소"를 소개해드릴게요!</Message>
                  </MessageList>
                </ScrollAnimation>
              </Grid.Column>
            </Grid>
          </Container>
        </Section>
      </Container>
    </>
  )
}
