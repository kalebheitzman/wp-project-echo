/** @jsx jsx */

// import libs
import React, { useContext } from 'react'

// import css
import { jsx, css } from '@emotion/core'
import mq from '../../utils/media'

// import components
import MyContext from '../../context/Context'
import NavLink from './ConnectedLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faDoorOpen,
	faVideo,
	faUsers,
	faUserFriends,
	faQuestion,
	faPoll,
	faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import Credit from './Credit'

export default () => {

	const context = useContext(MyContext)

	const {
		event: {
			eventSettings,
			eventBranding: {
				eventColors
			}
		}
	} = context.data

	const links = [
		{
			name: 'Lobby',
			path: '/',
			icon: faDoorOpen,
			main: false,
			enabled: true,
			cb: () => {
				context.setRoom({})
			}
		},
		{
			name: eventSettings.mainStageLabel,
			path: '/main-stage',
			icon: faVideo,
			main: 'main-stage',
			enabled: eventSettings.enableMainStage,
			cb: () => {
				context.setRoom({})
				// if (context.room.eventRoomSlug !== undefined) {
				// 	context.setConfirm(true)
				// }
			}
		},
		{
			name: "Schedule",
			path: '/schedule',
			icon: faCalendarAlt,
			enabled: context.room.eventRoomSlug !== undefined ? true : false
		},
		{
			name: eventSettings.roomsLabel,
			path: '/rooms',
			icon: faUsers,
			enabled: eventSettings.enableRooms
		},
		{
			name: eventSettings.chatLabel,
			path: '/chat',
			icon: faUserFriends,
			enabled: eventSettings.enableChat
		},
		{
			name: eventSettings.qaLabel,
			path: '/qa',
			icon: faQuestion,
			enabled: eventSettings.enableQa
		},
		{
			name: 'Polls',
			path: '/polls',
			icon: faPoll,
			enabled: false
		},
	]

	const enabledLinks = links.filter(item => {
		return item.enabled === true
	})

	return(
		<nav
			css={css`
				grid-area: navigation;
				background: #f7f7f7;
				border-top: 1px solid #eee;
				display: grid;
				grid-template-columns: 1fr;
				position: sticky;
				bottom: 0;
				padding: 0 1rem;

				${mq('tablet_up')} {
					grid-template-columns: 1fr;
					grid-template-rows: 1fr 100px;                        
					border-bottom: none;
					border-right: 1px solid #eee;
					box-sizing: border-box;    
					top: 100px;
					height: calc(100vh - 100px);
					padding: 0;
				}
			`}
		>
			<ul
				css={css`
					list-style: none;
					margin: 0;
					padding: 0;

					display: flex;
					justify-content: center;

					${mq('tablet_up')} {
						display: block;
						padding: 1rem 0;
					}

					li {
						margin: 0;
						padding: 0;
						display: flex;
						flex-grow: 1;
						flex-basis: 0;
						font-size: 1.2rem;

						${mq('tablet_up')} {
							display: block;
							margin: 0 0 1rem;
						}

						button {
							width: 100%;
							background: none;
							border: none;
							outline: none;
							padding: 0;
							margin: 0;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							cursor: pointer;
							color: #888;
							transition: all 85ms ease-out;
							text-decoration: none;
							border-bottom: 3px solid transparent;
							border-top: 3px solid transparent;

							${mq('tablet_up')} {
								border-bottom: none;
								border-top: none;
								border-right: 3px solid transparent;
								padding: 0.25rem 0;
							}	

							&.active,
							&:hover {
								border-bottom: 3px solid ${eventColors.primaryBackground};
								color: #333;

								${mq('tablet_up')} {
									border-bottom: none;
									border-right: 3px solid ${eventColors.primaryBackground};
								}
							}
						}

						span.label {
							font-size: 9px;
							text-transform: uppercase;
							display: block;

							${mq('tablet_up')} {
								font-size: 10px;
							}
						}
					}
				`}
			>
				{enabledLinks.map(link => {

					return (
						<li key={link.path}>
							<NavLink 
								exact={link.path === '/' ? true : false}
								to={link.path}
								activeClassName="active"
								css={css`
									line-height: 1.2rem;
								`}
								onClick={() => {
									if (link.main !== undefined) {
										context.setMain(link.main)
									}
									else {
										context.setMain(context.main)
									}

									if (link.cb !== undefined) {
										link.cb()
									}
								}}
							>
								<FontAwesomeIcon
									icon={link.icon}
									fixedWidth
									aria-hidden="true"
									title={link.name}
									css={css`
										text-align: center;
										margin-bottom: 5px;
									`}
								/>
								<span className="label">{link.name}</span>
							</NavLink>
						</li>
					)
				})}
			</ul>
			
			<Credit />
		</nav>
	)
}