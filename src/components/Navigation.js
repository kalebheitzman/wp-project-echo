/** @jsx jsx */

// import libs
import React from 'react'

// import css
import { jsx, css } from '@emotion/core'
import mq from '../utils/media'

// import components
import MyContext from '../context/Context'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
		faDoorOpen,
		faVideo,
		faUsers,
		faUserFriends,
		faQuestion,
		faPoll
  } from '@fortawesome/free-solid-svg-icons'

const links = [
	{
		name: 'Lobby',
		path: '/',
		icon: faDoorOpen,
		main: false
	},
	{
		name: 'Main Stage',
		path: '/main-stage',
		icon: faVideo,
		main: 'main-stage'
	},
	{
		name: 'Rooms',
		path: '/rooms',
		icon: faUsers
	},
	{
		name: 'Chat',
		path: '/chat',
		icon: faUserFriends
	},
	{
		name: 'Q&A',
		path: '/qa',
		icon: faQuestion,
	},
	{
		name: 'Polls',
		path: '/polls',
		icon: faPoll
	},
]

export default () => {

	return(
		<MyContext.Consumer>
			{context => {

				return(
					<nav
						className="echo-nav"
						css={css`
							background: #f7f7f7;
							border-right: 1px solid #eee;		
							display: grid;
							grid-template-columns: 1fr;
							grid-template-rows: 1fr 100px;
							
							${mq('tablet_up')} {
								padding-top: 1rem;
							}
						`}
					>
						<ul
							css={css`
								list-style: none;
								margin: 0;
								padding: 0;
								display: grid;
								grid-template-columns: 1fr 1fr 1fr 1fr;

								${mq('tablet_up')} {
									display: block;
								}

								li {
									text-align: center;
									margin: 0 0 5px;
									padding: 0;

									span.label {
										font-size: 10px;
										text-transform: uppercase;
										display: block;
									}

									a {
										color: #aaa;
										display: block;
										padding: 0.25rem 1rem;
										transition: all 85ms ease-out;
										border-left: 3px solid transparent;
										font-size: 1.2rem;
										text-decoration: none;

										&.active,
										&:hover {
											border-left: 3px solid var(--highlight-primary-bg);
											color: #333;
										}
									}
								}
							`}
						>
							{links.map(link => (
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
										}}
									>
										<FontAwesomeIcon
											icon={link.icon}
											fixedWidth
											aria-hidden="true"
											title={link.name}
											css={css`
												text-align: center;
											`}
										/>
										<span className="label">{link.name}</span>
									</NavLink>
								</li>
							))}
						</ul>
						<div
							css={css`
								display: flex;
								justify-content: center;
								align-items: center;

								a {
									font-size: 1.25rem;
									height: 3rem;
									width: 3rem;
									border-radius: 3rem;
									display: flex;
									justify-content: center;
									align-items: center;
									background: #eee;
									color: #ccc;
									font-weight: bold;
									text-decoration: none;
									transition: all 185ms ease-out;

									&:hover {
										background: #e9e7ea;
										color: #bbb;
									}
								}
							`}
						>
							<a
								href="https://github.com/kalebheitzman/wp-project-echo"
								target="_blank"
							>E</a>
						</div>
					</nav>
				)
			}}
		</MyContext.Consumer>
	)
}