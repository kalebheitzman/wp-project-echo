/** @jsx jsx */

// import libs
import React, { useContext, useState, useEffect } from 'react'

// import css
import { jsx, css } from '@emotion/core'
import mq from '../../utils/media'

// import components
import MyContext from '../../context/Context'

export default () => {

  const context = useContext(MyContext)

  const jitsiContainerId = 'jitsi-container-id'

  const [ jitsi, setJitsi ] = useState({})

	const loadJitsiScript = () => {
		let resolveLoadJitsiScriptPromise = null

		const loadJitsiScriptPromise = new Promise(resolve => {
			resolveLoadJitsiScriptPromise = resolve
		})

		const script = document.createElement('script')
		script.src = 'https://meet.jit.si/external_api.js'
		script.async = true
		script.onload = resolveLoadJitsiScriptPromise
		document.body.appendChild(script)

		return loadJitsiScriptPromise
	}

	const initilizeJitsi = async (cb) => {
		if (!window.JitsiMeetExternalAPI) {
			await loadJitsiScript()
		}

		let options = {}

		options.parentNode = document.getElementById(jitsiContainerId)
		options.roomName = context.room.eventRoomSlug
		options.configOverwrite = {
			disableDeepLinking: true,
		}
		options.interfaceConfigOverwrite = {
			MOBILE_APP_PROMO: false,
			TOOLBAR_BUTTONS: [
				'microphone', 'camera', 'fodeviceselection', 'hangup', 'profile', 
				'chat', 'settings', 'videoquality', 'filmstrip', 'feedback',
        'tileview', 'help',
    	],
		}

		if (context.user) {
			options.userInfo = {
				email: context.user.email,
				displayName: context.user.name
			}
		}
	
		const _jitsi = new window.JitsiMeetExternalAPI('meet.jit.si', options)

		setJitsi(_jitsi)
	}

	useEffect(() => {
		initilizeJitsi()

		return () => jitsi?.dispose?.()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return(			
		<div
			className="echo-jitsi-container"
			css={css`
				background: #374e62;
				height: 100%;
				
				iframe {
					min-height: 80vh;

					${mq('tablet_up')} {
						min-height: auto;
					}
				}
			`}
			id={jitsiContainerId}
		/>
	)
}