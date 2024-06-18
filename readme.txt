=== Makeiteasy Popup ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags:              popup, pop-up, modal, dialog
Requires at least: 6.5
Tested up to:      6.5
Stable tag:        1.0.0
Requires PHP: 7.4
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Advanced block based pop-up solution.

== Description ==

Need a popups for notices for your users? Marketing call to actions opening on scroll or timer, click on element or even on hover on some element? Several popups on one page?
This plugin has it all. Styling of the block is the same or similar as block editor core blocks + more.

#### There are plenty of such plugins. Why should I use this one?

❗Incorrect. This plugin feels like having native, built-in WP block. Plugin is self - sufficient, without heavy burden of having large blocks library, you can install it only there where you need it.
 It has only one very tiny dependency - micromodal.js - together with plugin popup handling code only 10 kB of js❗

#### Still not convinced. Different from others?

- **Fully** Open source code including block source code. You can freely fork this code and adjust it according to your project needs.
- **Developer friendly**: hooks for upgradable modifications, unopinionated starting css.
- **Lot of features** and **free**.
- **Compatibility** with future versions of WordPress guaranteed.

== Installation ==

You can install the plugin in usual way, however, the easiest way to get it is in block editor, by entering search phrase 'makeiteasy popup' or similar while inserting new block with '+' sign in top bar.

"Usual" way:

1. Install the plugin through the WordPress plugins screen directly or upload the plugin files to the `/wp-content/plugins/makeiteasy-popup` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Known limitations ==

Opening several modal popups is impossible due to limitations of Micromodal.js library used. In the future versions, removal of this library is planned and changing to native Dialog HTML element. Automatic migration of popups to new code will be available.

== Frequently Asked Questions ==

= Waiting for your questions =

I'll answer them here.

== Screenshots ==

1. Standard modal popup
2. Popup attached to top of screen, modeless
3. Various elements in popup
4. Modeless popup attached to element

== Changelog ==

= 1.0.0 =
* Initial Release

== Upgrade Notice ==

No upgrade notices yet.

== Block options ==

There are many options which block provides in block sidebar. Most of them function the same as for other blocks, but I will empasize some of them here to show possibilities and clarify functioning:
- Opening time selector: see section below
- Layout type: floating is centered (use css to move it around if it should not be exactly in the center), fixed is block sitting on some side of the screen, while attached is popup near to other element, one example is tooltip. This type also moves with element as you scroll.
- Popup is enabled - perhaps you want to hide popup for a while, but keep it to show it later. Disable this toggle button.
