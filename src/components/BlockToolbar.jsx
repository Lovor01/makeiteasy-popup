import { BlockControls, BlockAlignmentToolbar } from '@wordpress/block-editor';
// import { ToolbarGroup } from '@wordpress/components';

export default ( { attributes: { align }, setAttributes } ) => (
	<BlockControls>
		<BlockAlignmentToolbar
			value={ align }
			// eslint-disable-next-line no-shadow
			onChange={ ( align ) => {
				setAttributes( { align } );
			} }
		/>
	</BlockControls>
);
