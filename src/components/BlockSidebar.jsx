/* eslint-disable no-shadow */
// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inspector-controls

import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

export default ( {
	attributes: {
		openType,
		openSelector,
		layoutType,
		modalityType,
		relativeElement,
		hasCloseButton,
		openingTime,
		waitingAfterClosing,
		enabled,
	},
	setAttributes,
} ) => (
	<InspectorControls>
		<PanelBody
			title={ __( 'Opening', 'makeiteasy-popup' ) }
			icon={ __( 'admin-settings', 'makeiteasy-popup' ) }
			initialOpen={ true }
		>
			<PanelRow>
				<RadioControl
					label={ __( 'Opens on:', 'makeiteasy-popup' ) }
					help={ __( 'What triggers opening.', 'makeiteasy-popup' ) }
					selected={ openType }
					options={ [
						{
							label: __( 'On timer', 'makeiteasy-popup' ),
							value: 'on timer',
						},
						{
							label: __( 'On scroll', 'makeiteasy-popup' ),
							value: 'on scroll',
						},
						{
							label: __( 'On click', 'makeiteasy-popup' ),
							value: 'on click',
						},
						{
							label: __( 'On hover', 'makeiteasy-popup' ),
							value: 'on hover',
						},
					] }
					onChange={ ( openType ) => {
						setAttributes( { openType } );
					} }
				/>
			</PanelRow>
			{ [ 'on click', 'on scroll', 'on hover' ].includes( openType ) && (
				<PanelRow>
					<TextControl
						label="CSS selector"
						help="CSS selector of element to open popup"
						value={ openSelector }
						onChange={ ( openSelector ) =>
							setAttributes( { openSelector } )
						}
					/>
				</PanelRow>
			) }
			{ /*
			 * on timer set time after which popup will be opened,
			 * on hover set time after which popup will be opened again
			 */ }
			{ [ 'on timer', 'on hover' ].includes( openType ) && (
				<PanelRow>
					<UnitControl
						onChange={ ( openingTime ) => {
							setAttributes(
								openType === 'on timer'
									? { openingTime }
									: { waitingAfterClosing: openingTime }
							);
						} }
						label={
							openType === 'on timer'
								? __( 'Open after', 'makeiteasy-popup' )
								: __( 'Time to open again', 'makeiteasy-popup' )
						}
						help={
							openType === 'on hover'
								? '-1 to open only once.'
								: ''
						}
						value={
							openType === 'on timer'
								? openingTime
								: waitingAfterClosing
						}
						units={
							openType === 'on timer'
								? [
										{
											a11yLabel: 'Seconds',
											label: 's',
											step: 1,
											value: 's',
										},
										{
											a11yLabel: 'Milliseconds',
											label: 'ms',
											step: 100,
											value: 'ms',
										},
								  ]
								: [
										{
											a11yLabel: 'Seconds',
											label: 's',
											step: 1,
											value: 's',
										},
								  ]
						}
					/>
				</PanelRow>
			) }
		</PanelBody>
		<PanelBody
			title={ __( 'Layout', 'makeiteasy-popup' ) }
			icon={ __( 'admin-settings', 'makeiteasy-popup' ) }
			initialOpen={ true }
		>
			<PanelRow>
				<RadioControl
					label="Layout type"
					selected={ layoutType }
					options={ [
						{ label: 'floating', value: 'floating' },
						{ label: 'static', value: 'static' },
						{ label: 'attached', value: 'attached' },
					] }
					onChange={ ( layoutType ) => {
						setAttributes( { layoutType } );
					} }
				/>
			</PanelRow>
			{ layoutType === 'attached' && (
				<PanelRow>
					<TextControl
						label="CSS selector"
						help="Element to which this one is attached"
						value={ relativeElement }
						onChange={ ( relativeElement ) =>
							setAttributes( { relativeElement } )
						}
					/>
				</PanelRow>
			) }
			<PanelRow>
				<RadioControl
					label="Modality type"
					selected={ modalityType }
					options={ [
						{ label: 'modal', value: 'modal' },
						{ label: 'modeless', value: 'modeless' },
					] }
					onChange={ ( modalityType ) => {
						setAttributes( { modalityType } );
					} }
				/>
			</PanelRow>
		</PanelBody>
		<PanelBody
			title={ __( 'Visibility', 'makeiteasy-popup' ) }
			icon={ __( 'admin-settings', 'makeiteasy-popup' ) }
			initialOpen={ true }
		>
			<PanelRow>
				<ToggleControl
					label="Has close button"
					checked={ hasCloseButton }
					onChange={ ( hasCloseButton ) =>
						setAttributes( { hasCloseButton } )
					}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label="Popup is enabled"
					checked={ enabled }
					onChange={ ( enabled ) => setAttributes( { enabled } ) }
					help="Whether popup will show at all."
				/>
			</PanelRow>
		</PanelBody>
	</InspectorControls>
);
