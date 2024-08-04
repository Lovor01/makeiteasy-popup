=== MakeITeasy Popup ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags:              popup, pop-up, modal, dialog
Requires at least: 6.5
Tested up to:      6.6
Stable tag:        1.1.3
Requires PHP: 7.4
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Advanced block based pop-up solution.

== Description ==

Need popups to grab your users' attention? Marketing call-to-actions that open on scroll, timer, click, matched referer or even hover?
Multiple popups on one page? This plugin has it all. It provides styling consistent with core block editor blocks plus additional features.

= Why choose Makeiteasy Popup? =

❗ Unlike some other plugins, Makeiteasy Popup integrates seamlessly with WordPress,
feeling like a native, built-in WP block. It’s lightweight and self-sufficient,
without the heavy burden of a large blocks library.
It relies on a single tiny dependency - micromodal.js - with a combined total of only 10 kB of JavaScript ❗

👆 Try demo - there is a "Live preview" button on the top of this page 👆

= Key Features =

- 🥇 **Feature-Rich** and **free**.
- 🥈 **Fully Open Source**: Including the block source code. Fork and adjust as needed.
- 🥉 **Developer friendly**: Hooks for modifications and unopinionated starting CSS.
- ⏲️ **Future-Proof Compatibility**: Guaranteed compatibility with future WordPress versions.

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

= How does the 'CSS Selector' field work? =

The CSS Selector field, used in the "open on scroll," "hover," and "click" options, allows you to specify a CSS selector to identify the element that will trigger the popup. The selector can be of any complexity, but it must uniquely select an element. If multiple elements match the selector, only the first one will trigger the popup.
To define the trigger in practice, go to the advanced section of the desired block and specify an anchor keyword or an additional CSS class. For an anchor, use `#` as the prefix, and for a class, use `.` (dot). For example, if your anchor is `myelement`, you would use `#myelement` in the CSS Selector field.

= How does "Show again after days" function? =

When you enter number other than 0 under "Additional rules" section, in "Show again after days" textbox, the rule is set to initially open the popup. After reloading the page, popup will open only upon selected period in days expires.

= Have questions? =

Post them here, and I’ll answer them.

== Screenshots ==

1. Standard modal popup
2. Popup attached to top of screen, modeless
3. Various elements in popup
4. Modeless popup attached to element

== Changelog ==

= 1.1.3 =
* Bug fix where if popups with time delay for repeated opening were used, some attached popups may not attach.

= 1.1.2 =
* Bug fix for setting same width of popup as attached element
* Enhancement - choosing width same as attached element for any type of block opening

= 1.1.1 =
* Introduced setting width of popup to same width as element (only for opening on hover)
* Bug fixes

= 1.1.0 =
* Added opening once in interval per user
* Added opening on matching URL referer
* Added accessibility label for dialog
* Small CSS fixes

= 1.0.0 =
* Initial Release

== Upgrade Notice ==

= 1.1.3 =
Bug fixes.

= 1.1.2 =
New features and bug fixes.

= 1.1.1 =
New features and fixes for css (visual) bugs.

= 1.1.0 =
New features: open on referer and open again only after given interval in days.

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

= Github repository =

[https://github.com/Lovor01/makeiteasy-popup](https://github.com/Lovor01/makeiteasy-popup)

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
