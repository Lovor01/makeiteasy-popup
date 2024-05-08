import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
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
				Show popup control
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="mie-popup-sidebar"
				title="MakeITeasy popup"
				icon={ Icon }
			>
				<PanelBody className="mie-popup-plugin-panel">
					<PanelRow>
						<Text weight={ 600 }>Editor visibility</Text>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Show popups"
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