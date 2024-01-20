// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inspector-controls

import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

export default ( {
	attributes: {
		openType,
		openSelector,
		layoutType,
		modalityType,
		position,
		hasCloseButton,
	},
	setAttributes,
} ) => (
	<InspectorControls>
		<PanelBody
			title="Popup Settings"
			// eslint-disable-next-line no-undef
			icon="admin-settings"
			initialOpen={ true }
		>
			<PanelRow>
				<RadioControl
					label="Popup type"
					help="The way popup appears"
					selected={ openType }
					options={ [
						{ label: 'On timer', value: 'on timer' },
						{ label: 'On scroll', value: 'on scroll' },
						{ label: 'On click', value: 'on click' },
						{ label: 'Custom', value: 'custom' },
					] }
					// eslint-disable-next-line no-shadow
					onChange={ ( openType ) => {
						setAttributes( { openType } );
					} }
				/>
			</PanelRow>
			<PanelRow>
				{ ( openType === 'on click' || openType === 'on scroll' ) && (
					<TextControl
						label="CSS selector"
						help="CSS selector of element to open popup"
						value={ openSelector }
						// eslint-disable-next-line no-shadow
						onChange={ ( openSelector ) =>
							setAttributes( { openSelector } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
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
					// eslint-disable-next-line no-shadow
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
					// eslint-disable-next-line no-shadow
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
					// eslint-disable-next-line no-shadow
					onChange={ ( position ) => {
						setAttributes( { position } );
					} }
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label="Has close button"
					checked={ hasCloseButton }
					// eslint-disable-next-line no-shadow
					onChange={ ( hasCloseButton ) =>
						setAttributes( { hasCloseButton } )
					}
				/>
			</PanelRow>
		</PanelBody>
	</InspectorControls>
);
