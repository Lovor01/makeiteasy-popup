=== Makeiteasy Popup ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags:              popup, pop-up, modal, dialog
Requires at least: 6.5
Tested up to:      6.6
Stable tag:        1.1.0
Requires PHP: 7.4
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Advanced block based pop-up solution.

== Description ==

Need popups to grab your users' attention? Marketing call-to-actions that open on scroll, timer, click, matched referer or even hover?
Multiple popups on one page? This plugin has it all. It provides styling consistent with core block editor blocks plus additional features.

= Why choose Makeiteasy Popup? =

❗Unlike other plugins, Makeiteasy Popup integrates seamlessly with WordPress,
feeling like a native, built-in WP block. It’s lightweight and self-sufficient,
without the heavy burden of a large blocks library.
It relies on a single tiny dependency - micromodal.js - with a combined total of only 10 kB of JavaScript❗

= Key Features =

- **Fully Open Source**: Including the block source code. Fork and adjust as needed.
- **Developer friendly**: Hooks for modifications and unopinionated starting CSS.
- **Feature-Rich** and **free**.
- **Future-Proof Compatibility**: Guaranteed compatibility with future WordPress versions.

== Installation ==

= From block editor: =

Search for 'makeiteasy popup' in the block editor when adding a new block via the '+' sign in the top bar.

= Standard Installation: =

1. Install the plugin through the WordPress plugins screen directly or upload the plugin files to the `/wp-content/plugins/makeiteasy-popup` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Known limitations ==

Currently, opening several modal popups simultaneously is impossible due to the limitations of the Micromodal.js library.
Future versions will replace this library with the native `Dialog` HTML element, including automatic migration for existing popups.

== Frequently Asked Questions ==

= Have questions? =

Post them here, and I’ll answer them.

== Screenshots ==

1. Standard modal popup
2. Popup attached to top of screen, modeless
3. Various elements in popup
4. Modeless popup attached to element

== Changelog ==

= 1.1.0 =
* Added opening once in interval per user
* Added opening on matching URL referer
* Added accessibility label for dialog
* Small CSS fixes

= 1.0.0 =
* Initial Release

== Upgrade Notice ==

= 1.1.0 =

New features: open on referer and open again only after given interval in days

== Block options ==

The block sidebar provides many options, most of which function similarly to other blocks. Notable options include:
- **Opening time selector**: See the detailed section below.
- **Layout type**: Floating, Fixed, Attached
- **Popup Enabled**: Temporarily hide the popup without deleting it.
- **Open on interval**: Open on given interval in days.
- **Open on matching referer**: Open if the user's referral URL matches.

= Layout Types =

- **Floating**: popup floats above content. Clicking on area outside popup closes it.
- **Fixed**: popup is "fixed" to one of sides of screen -- top, bottom, right, left
- **Attached**: popup is attached to element on screen. When user scrolls, it moves with it.

== Developers ==

= Changing the Close button =

Using Javascript:

`
import { ReactComponent as CloseIcon } from '../assets/close-x.svg';
addFilter( 'makeiteasy-closeButtonIcon', 'makeiteasy/makeiteasy-popup/close-icon', () => (<CloseIcon />) );
`

If you customize button this way and you already have posts(or pages) with popup block,
on post reopening the message "This block contains unexpected or invalid content." will be presented.
In such case choose "Attempt to repair block" and if it looks good, save post.

Using PHP:

`
add_action( 'render_block_makeiteasy/popup', function($content) {
  $svg = file_get_contents( __DIR__ . '/path_to_file/close-button-dark.svg' );
  return preg_replace(
    '~(<button.*class="makeiteasy-popup-close".*?>).*(</button>)~m',
    "$1$svg$2",
    $content
    );
} );
`

= Attaching Code to Modal Events =

Custom events 'makeiteasy/openModal' and 'makeiteasy/closeModal' are fired on modal open and close.
