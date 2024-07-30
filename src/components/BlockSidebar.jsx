/* eslint-disable @wordpress/no-unsafe-wp-apis */
/* eslint-disable no-shadow */
// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/block-editor/src/components/inspector-controls

import {
	InspectorControls,
	useSettings,
	ColorPalette,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
	// ColorPalette,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

export default ( {
	attributes: {
		openType,
		openSelector,
		layoutType,
		modalityType,
		attachedBaseElement,
		hasCloseButton,
		openingTime,
		waitingAfterClosing,
		enabled,
		closeButtonColor,
		closeButtonPosition,
		popupWidth,
		popupWidthSameAsOpener,
		fixedPopupPosition,
		daysToShowAgain,
		refererURLMatch,
		accessibleDialogLabel,
	},
	setAttributes,
} ) => {
	const auxFixed = (
		<ToggleGroupControl
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			isBlock
			label="Popup is placed at:"
			value={ fixedPopupPosition }
			onChange={ ( fixedPopupPosition ) =>
				setAttributes( { fixedPopupPosition } )
			}
		>
			<ToggleGroupControlOption label={ __( 'Bottom' ) } value="bottom" />
			<ToggleGroupControlOption label={ __( 'Top' ) } value="top" />
			<ToggleGroupControlOption label={ __( 'Left' ) } value="left" />
			<ToggleGroupControlOption label={ __( 'Right' ) } value="right" />
		</ToggleGroupControl>
	);

	const auxAttached = (
		<PanelRow>
			<TextControl
				label={ __( 'CSS selector' ) }
				help={ __( 'Element to which this one is attached' ) }
				value={ attachedBaseElement }
				onChange={ ( attachedBaseElement ) =>
					setAttributes( { attachedBaseElement } )
				}
			/>
		</PanelRow>
	);

	const [ availableUnits ] = useSettings( 'spacing.units' );
	const units = useCustomUnits( {
		availableUnits: availableUnits || [ '%', 'px', 'em', 'rem', 'vw' ],
	} );

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={ __( 'Opening', 'makeiteasy-popup' ) }
					icon="admin-settings"
					initialOpen={ true }
				>
					<PanelRow>
						<RadioControl
							label={ __( 'Opens on:', 'makeiteasy-popup' ) }
							help={ __(
								'What triggers opening.',
								'makeiteasy-popup'
							) }
							selected={ openType }
							options={ [
								{
									label: __( 'On timer', 'makeiteasy-popup' ),
									value: 'on timer',
								},
								{
									label: __(
										'On scroll',
										'makeiteasy-popup'
									),
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
								{
									label: __(
										'On referer',
										'makeiteasy-popup'
									),
									value: 'on referer',
								},
							] }
							onChange={ ( openType ) => {
								setAttributes( { openType } );
							} }
						/>
					</PanelRow>
					{ [ 'on click', 'on scroll', 'on hover' ].includes(
						openType
					) && (
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
											: {
													waitingAfterClosing:
														openingTime,
											  }
									);
								} }
								label={
									openType === 'on timer'
										? __( 'Open after', 'makeiteasy-popup' )
										: __(
												'Time to open again',
												'makeiteasy-popup'
										  )
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
					{ 'on referer' === openType && (
						<PanelRow>
							<TextControl
								label={ __(
									'Open on referer URL match',
									'makeiteasy-popup'
								) }
								value={ refererURLMatch ?? '' }
								onChange={ ( refererURLMatch ) =>
									setAttributes( { refererURLMatch } )
								}
								help={ __(
									'Enter part of URL to match.',
									'makeiteasy-popup'
								) }
							/>
						</PanelRow>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Layout', 'makeiteasy-popup' ) }
					icon="admin-settings"
					initialOpen={ true }
				>
					<PanelRow>
						<RadioControl
							label="Layout type"
							selected={ layoutType }
							options={ [
								{ label: 'floating', value: 'floating' },
								{ label: 'fixed', value: 'fixed' },
								{ label: 'attached', value: 'attached' },
							] }
							onChange={ ( layoutType ) => {
								setAttributes( { layoutType } );
							} }
						/>
					</PanelRow>
					{ layoutType === 'fixed' && auxFixed }
					{ layoutType === 'attached' && auxAttached }
					<PanelRow className="mie-modality-type">
						<RadioControl
							label="Modality type"
							selected={ modalityType }
							options={
								openType !== 'on hover'
									? [
											{ label: 'modal', value: 'modal' },
											{
												label: 'modeless',
												value: 'modeless',
											},
									  ]
									: [
											{
												label: 'modeless',
												value: 'modeless',
											},
									  ]
							}
							onChange={ ( modalityType ) => {
								setAttributes( { modalityType } );
							} }
						/>
						{ openType === 'on hover' && (
							<p>
								Due to accessibility issues, popup which
								activates on hover cannot be modal. Also, please
								follow good practices and do not convey any
								important information in it.
								<br />
								<a href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html">
									Content on Hover or Focus
								</a>
							</p>
						) }
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Visibility', 'makeiteasy-popup' ) }
					icon="admin-settings"
					initialOpen={ true }
				>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Has close button',
								'makeiteasy-popup'
							) }
							checked={ hasCloseButton }
							onChange={ ( hasCloseButton ) =>
								setAttributes( { hasCloseButton } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Popup is enabled',
								'makeiteasy-popup'
							) }
							checked={ enabled }
							onChange={ ( enabled ) =>
								setAttributes( { enabled } )
							}
							help="Disabled block is saved for later showing."
							title="If you disable block, it will not be shown, but you can keep it and enable it again sometimes."
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Accessibility', 'makeiteasy-popup' ) }
					icon="admin-settings"
					initialOpen={ false }
				>
					<PanelRow>
						<TextControl
							label={ __(
								'Dialog accessible label',
								'makeiteasy-popup'
							) }
							value={ accessibleDialogLabel ?? '' }
							onChange={ ( accessibleDialogLabel ) =>
								setAttributes( { accessibleDialogLabel } )
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Additional rules', 'makeiteasy-popup' ) }
					icon="admin-settings"
					initialOpen={ false }
				>
					<PanelRow>
						<NumberControl
							className="makeiteasy-popup-days-to-show-again"
							label={ __(
								'Show again after days',
								'makeiteasy-popup'
							) }
							type="number"
							onChange={ ( value ) => {
								setAttributes( {
									daysToShowAgain: parseInt( value ),
								} );
							} }
							value={ daysToShowAgain }
							help={ __(
								'Set to 0 to show each time',
								'makeiteasy-popup'
							) }
							pattern="^\d+$"
							required
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="Close button appearance">
					<PanelRow className="mie-span-2">
						<ColorPalette
							clearable
							// not needed if ColorPalette is from block/editor colors={ useSettings( 'color.palette' )[ 0 ] }
							enableAlpha
							value={ closeButtonColor }
							onChange={ ( closeButtonColor ) => {
								setAttributes( { closeButtonColor } );
							} }
						/>
					</PanelRow>
					<PanelRow className="mie-span-2">
						<ToggleControl
							label="Button beside content"
							checked={ closeButtonPosition === 'beside' }
							onChange={ ( isBeside ) =>
								setAttributes( {
									closeButtonPosition: isBeside
										? 'beside'
										: 'above',
								} )
							}
							help={
								closeButtonPosition === 'above'
									? __(
											'Close button floats above content to not affect content positioning.'
									  )
									: __(
											'Close button is to the right content, to avoid intersecting content'
									  )
							}
							title={ __(
								'If enabled, close button will be on the right side of content.'
							) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="dimensions">
				{ openType === 'on hover' && (
					<PanelRow>
						<ToggleControl
							label={ __( 'Same as opener', 'makeiteasy-popup' ) }
							checked={ popupWidthSameAsOpener }
							onChange={ ( popupWidthSameAsOpener ) =>
								setAttributes( { popupWidthSameAsOpener } )
							}
							help={ __(
								'Set width the same as opener element',
								'makeiteasy-popup'
							) }
							title="If you disable block, it will not be shown, but you can keep it and enable it again sometimes."
						/>
					</PanelRow>
				) }
				<PanelRow>
					<UnitControl
						onChange={ ( popupWidth ) => {
							setAttributes( { popupWidth } );
						} }
						value={ popupWidth || 'Auto' }
						__unstableInputWidth="14ch"
						label="Popup width"
						units={ units }
						disabled={ popupWidthSameAsOpener }
					></UnitControl>
				</PanelRow>
			</InspectorControls>
		</>
	);
};
