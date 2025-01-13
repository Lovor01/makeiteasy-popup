/**
 * Guide for the user to get started with the plugin.
 */

// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/guide
import { Guide, ExternalLink } from '@wordpress/components';
// import { Suspense } from '@wordpress/element';
// import { store as coreStore } from '@wordpress/core-data';
import {
	// useSuspenseSelect,
	dispatch,
	useSelect,
	useDispatch,
} from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { ReactComponent as ImgPage1 } from './images/welcome-p1.svg';
import { ReactComponent as ImgPage2 } from './images/welcome-p2.svg';
import { ReactComponent as ImgPage3 } from './images/welcome-p3.svg';
import { ReactComponent as ImgPage32 } from './images/welcome-p32.svg';
import { ReactComponent as ImgPage4 } from './images/welcome-p4.svg';
import { ReactComponent as ImgPage5 } from './images/welcome-p5.svg';
import { ReactComponent as ImgPage6 } from './images/welcome-p6.svg';
import { ReactComponent as ImgPage7 } from './images/welcome-p7.svg';

// initialize defaults
export function init() {
	dispatch( preferencesStore ).setDefaults( 'makeiteasy/popup', {
		welcomeGuide: true,
	} );
}

export function showGuideNow() {
	dispatch( preferencesStore ).set(
		'makeiteasy/popup',
		'welcomeGuide',
		true
	);
}

export default function () {
	// const { url } = useSuspenseSelect(
	// 	( select ) => select( coreStore ).getSite(),
	// 	[]
	// );
	const showGuide = useSelect( ( select ) =>
		select( preferencesStore ).get( 'makeiteasy/popup', 'welcomeGuide' )
	);
	const { toggle } = useDispatch( preferencesStore );

	if ( ! showGuide ) {
		return null;
	}

	return (
		<Guide
			onFinish={ () => toggle( 'makeiteasy/popup', 'welcomeGuide' ) }
			className="edit-post-welcome-guide"
			pages={ [
				{
					// page 1
					image: (
						<ImgPage1 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Welcome to Make IT easy popup!',
									'makeiteasy-popup'
								) }
							</h1>
							<p className="edit-post-welcome-guide__text">
								{ __(
									"To insert popup into the post, find 'MakeITeasy Popup' block under Widgets group.",
									'makeiteasy-popup'
								) }
							</p>
						</>
					),
				},
				{
					// page 2
					image: (
						<ImgPage2 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Content', 'makeiteasy-popup' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'Inside popup block, you can insert any number of blocks, like you would normally with group, column, quote block etc.',
										'makeiteasy-popup'
									) }
								</p>
							</div>
						</>
					),
				},
				{
					// page 3
					image: (
						<ImgPage3 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Opening conditions',
									'makeiteasy-popup'
								) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'Probably most important setting is opening condition.',
										'makeiteasy-popup'
									) }
								</p>
								<p>
									{
										// eslint-disable-next-line @wordpress/i18n-no-flanking-whitespace
										__(
											'Popup can be opened after some time passes, on scroll, on click or on hover. All these conditions can be combined with opening referer.',
											'makeiteasy-popup'
										)
									}
								</p>
							</div>
						</>
					),
				},
				{
					// page 4
					image: (
						<ImgPage32 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Selectors', 'makeiteasy-popup' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										"Some opening conditions, such as 'on click,' require an element to trigger the popup when interacted with.",
										'makeiteasy-popup'
									) }
								</p>
								<p>
									{
										// eslint-disable-next-line @wordpress/i18n-no-flanking-whitespace
										__(
											"To achieve this, you need to provide the CSS selector of the element that will trigger the popup, whether it's clicked, scrolled to, or hovered over.",
											'makeiteasy-popup'
										)
									}
								</p>
							</div>
						</>
					),
				},
				{
					// page 5
					image: (
						<ImgPage4 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'What is referer?', 'makeiteasy-popup' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'Referer is simply the URL of the page where user was before coming to current page.',
										'makeiteasy-popup'
									) + ' ' }
								</p>
								<p>
									{ __(
										'MDN documentation:',
										'makeiteasy-popup'
									) + ' ' }
									<span>
										<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer">
											{ _x(
												'Referer',
												'external link text',
												'makeiteasy-popup'
											) }
										</ExternalLink>
									</span>
									{ '.' }
								</p>
							</div>
						</>
					),
				},
				{
					// page 6
					image: (
						<ImgPage5 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Referer condition',
									'makeiteasy-popup'
								) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'If referer field is left unfilled, there will be no condition for referer. Otherwise, popup will open only if any part of referer matches the string in this field.',
										'makeiteasy-popup'
									) +
										' ' +
										__(
											'This condition is combined with opening condition, so popup will open only if both conditions are met.',
											'makeiteasy-popup'
										) }
								</p>
							</div>
						</>
					),
				},
				{
					// page 7
					image: (
						<ImgPage6 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Additional rules', 'makeiteasy-popup' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										"You have possibility to set when dismissed popup will appear again. The timer's state is preserved across user sessions, ensuring a consistent reappearance interval.",
										'makeiteasy-popup'
									) }
								</p>
							</div>
						</>
					),
				},
				{
					// page 8
					image: (
						<ImgPage7 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Close button', 'makeiteasy-popup' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'Changing the close button is so far possible only programmatically by using filters. It is planned to add UI in the settings for uploading custom image.',
										'makeiteasy-popup'
									) }
								</p>
								<p>
									{ __( 'Read in the', 'makeiteasy-popup' ) }{ ' ' }
									<ExternalLink href="https://wordpress.org/plugins/makeiteasy-popup/#description">
										{ _x(
											'plugin readme',
											'external link text',
											'makeiteasy-popup'
										) }
									</ExternalLink>{ ' ' }
									{ __(
										'how to change the close button.',
										'makeiteasy-popup'
									) +
										' ' +
										__(
											'You can also refer to readme for other questions you might have',
											'makeiteasy-popup'
										) }
									.
								</p>
							</div>
						</>
					),
				},
			] }
		/>
	);
}
