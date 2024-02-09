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
		position,
		hasCloseButton,
		openingTime,
	},
	setAttributes,
} ) => (
	<InspectorControls>
		<PanelBody
			title={ __( 'Popup Settings', 'makeiteasy-popup' ) }
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
			<PanelRow>
				{ [ 'on click', 'on scroll', 'on hover' ].includes(
					openType
				) && (
					<TextControl
						label="CSS selector"
						help="CSS selector of element to open popup"
						value={ openSelector }
						onChange={ ( openSelector ) =>
							setAttributes( { openSelector } )
						}
					/>
				) }
				{ openType === 'on timer' && (
					<UnitControl
						onChange={ ( openingTime ) => {
							setAttributes( { openingTime } );
						} }
						value={ openingTime }
						units={ [
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
						] }
					/>
				) }
			</PanelRow>
			<PanelRow>
				<RadioControl
					label="Layout type"
					selected={ layoutType }
					options={ [
						{ label: 'floating', value: 'floating' },
						{ label: 'fixed', value: 'fixed' },
					] }
					onChange={ ( layoutType ) => {
						setAttributes( { layoutType } );
					} }
				/>
			</PanelRow>
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
			<PanelRow>
				<RadioControl
					label="Position"
					selected={ position }
					options={ [
						{ label: 'central', value: 'central' },
						{ label: 'aside', value: 'aside' },
						{ label: 'relative', value: 'relative' },
					] }
					onChange={ ( position ) => {
						setAttributes( { position } );
					} }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label="Has close button"
					checked={ hasCloseButton }
					onChange={ ( hasCloseButton ) =>
						setAttributes( { hasCloseButton } )
					}
				/>
			</PanelRow>
		</PanelBody>
	</InspectorControls>
);
