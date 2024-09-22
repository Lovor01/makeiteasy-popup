import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { ReactComponent as Icon } from '../assets/block-icon.svg';
import {
	ToggleControl,
	PanelBody,
	PanelRow,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalText as Text,
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import popupStore from '../store';
import { __ } from '@wordpress/i18n';

// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/panel#panelbody

// use new data-controls
// import { dispatch, select } from '@wordpress/data-controls';

const PluginSidebarTest = () => {
	const setPopupsOpen = useDispatch( popupStore ).setPopupsOpen;
	const popupsOpen = useSelect( ( select ) =>
		select( popupStore ).getPopupsOpen()
	);

	return (
		<>
			<PluginSidebarMoreMenuItem
				target="mie-popup-sidebar"
				icon="admin-plugins"
			>
				{ __( 'Show popup control', 'makeiteasy-popup' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="mie-popup-sidebar"
				title={ __( 'MakeITeasy popup', 'makeiteasy-popup' ) }
				icon={ Icon }
			>
				<PanelBody className="mie-popup-plugin-panel">
					<PanelRow>
						<Text weight={ 600 }>
							{ __( 'Editor visibility', 'makeiteasy-popup' ) }
						</Text>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show popups', 'makeiteasy-popup' ) }
							checked={ popupsOpen }
							onChange={ ( value ) => {
								setPopupsOpen( value );
							} }
							help="This applies only for editor"
						/>
					</PanelRow>
				</PanelBody>
			</PluginSidebar>
		</>
	);
};

registerPlugin( 'mie-popup-sidebar', {
	render: PluginSidebarTest,
	icon: Icon,
} );
