import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Button, Grid } from 'semantic-ui-react'
import styles from 'styled-components'

import { motion } from 'framer-motion'
import Message from '../components/Message'
import MessageList from '../components/MessageList'

const Section = styles.section`
  minHeight: 100vh;
`
export default function Main () {
  return (
    <>
      <div style={{ paddingBottom: '100px' }}>
        <Section id='hero' style={{ textAlign: 'center', padding: '25vh 0' }}>
          <Container textAlign='center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
            > <h1><Icon name='tree' color='green' /></h1>
              <Header as='h1' style={{ fontSize: '7vh' }}>마음의 숲</Header>
              <br />
              <Icon name='quote left' />
              <h2>자신도 몰랐던 자신의 마음 속을 들여다보세요.</h2>
              <Icon name='quote right' />
              <div style={{ minHeight: '2vh' }} />
              <Button size='large' href='#about' circular>
                더 알아보기
              </Button>
            </motion.div>

          </Container>
        </Section>
        <Section
          style={{ background: '#f6f6f6' }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
            <path fill='#ffffff' fillOpacity='1' d='M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,117.3C672,160,768,224,864,240C960,256,1056,224,1152,192C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z' />
          </svg>
          <Container textAlign='center' style={{ paddingTop: '50px' }}>
            <section id='about' />
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
              <Grid.Column mobile={16} computer={8} textAlign='center' style={{ padding: '20vh 0' }}>
                <Header as='h2' style={{ fontSize: '4vh' }}>고민이 있으세요?</Header>
                <h3>AI를 통한 우울증 진단으로 마음의 병을 <br />미리 진단하고, 자살을 예방합니다.</h3><br />
                <Button icon labelPosition='right' color='blue' size='large' href='/chatBot' circular>
                  검사받기
                  <Icon name='arrow right' />
                </Button>
              </Grid.Column>
            </Grid>
          </Container>

        </Section>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path fill='#f6f6f6' fillOpacity='1' d='M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,117.3C672,160,768,224,864,240C960,256,1056,224,1152,192C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z' />
        </svg>
        <Section id='github' style={{ textAlign: 'center' }}>
          <Header as='h2' style={{ fontSize: '4vh', padding: '10vh 0' }}>오픈소스</Header>
          <h3>모든 소스코드는 Github에 공개되어있습니다.</h3>
          <h4>Made with ❤️</h4>
          <p>
            <h5>사용한 데이터셋</h5>
            <p>전국건강증진센터표준데이터.csv<br />정신건강관련전체기관정보_2019.csv<br />KOSAC Sentiment Polarity Lexicon</p>
          </p>
          <Button secondary href='https://github.com/rabbit-oyster/The-forest-of-the-mind'><Icon name='github' /> Github에서 보기</Button>
        </Section>
      </div>
    </>
  )
}
