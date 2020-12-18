import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Button, Grid } from 'semantic-ui-react'
import styles from 'styled-components'
import ScrollAnimation from 'react-animate-on-scroll'
import Message from '../components/Message'

const Section = styles.section`
  height: 100vh;
  scroll-snap-align: start;
`
export default function Main () {
  return (
    <>
      <Container textAlign='center' style={{ height: '100vh', width: '100%', background: '#fefefe', overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
        <Section id='hero' style={{ minHeight: '100vh', textAlign: 'center', paddingTop: '30vh' }}>
          <Header as='h1' style={{ fontSize: '10vh' }}>마음의 숲</Header>
          <h2><Icon name='quote left' />자신도 몰랐던 자신의 마음 속을 들여다보세요.<Icon name='quote right' /></h2>
          <div style={{ minHeight: '2vh' }} />
          <Button icon labelPosition='right' color='blue' size='large' as={Link} to='/chatBot'>
            검사받기
            <Icon name='arrow right' />
          </Button>
          <Button icon labelPosition='right' color='green' size='large' as={Link} to='/chat'>
            상담하기
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
                  <p><ul><Message type='solo' self>고민이 있으세요?</Message></ul></p>
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
                    <ScrollAnimation animateIn='fadeIn'>
                      <p><ul><Message type='solo' self>고민이 있으세요?</Message></ul></p>
                    </ScrollAnimation>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} computer={8} textAlign='center'>
                <h1>뀨</h1>
              </Grid.Column>
            </Grid>
          </Container>
        </Section>
      </Container>
    </>
  )
}
