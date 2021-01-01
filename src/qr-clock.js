import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import moment from 'moment'
import withSizes from 'react-sizes'
import GitHubForkRibbon from 'react-github-fork-ribbon'

const getTime = () => moment().format('YYYY-MM-DDTHH:mm:ss');

const QRClock = ({ width, height }) => {
  let [time, setTime] = useState(getTime())
  let last = 0;

  // From: https://css-tricks.com/using-requestanimationframe-with-react-hooks/
  const requestRef = React.useRef();
  
  const animate = now => {
    if (now - last >= 1000) {
      setTime(getTime());
      last = now;
    }
    requestRef.current = requestAnimationFrame(animate);
  }
  
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  return (
    <div className='main-container'>
      <div style={{ color: '#000', height: 25 }}>{ `QR-Clock by kaelhem ©2019, Yehuda B. ©2021` }</div>
      <div className="humak-date">{ time.split('T')[0] }</div>
      <div className="humak-time">{ time.split('T')[1] }</div>
      <div className='clock-container'>
        <QRCode
          value={ time }
          renderAs='svg'
          size={ Math.min(width - 50, height - 110) }
          bgColor={ '#FFF' }
          fgColor={ '#000' }
        />
      </div>
      <GitHubForkRibbon
        href="https://github.com/yehudab/qr-clock"
        target="_blank"
        position="right"
        color="orange"
      >Fork me on GitHub</GitHubForkRibbon>
    </div>
  )
}

export default withSizes(sizes => sizes)(QRClock)
