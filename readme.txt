=== StatsFC Live ===
Contributors: willjw
Donate link:
Tags: widget, football, soccer, fixtures, scores, live, premier league, fa cup, league cup
Requires at least: 3.3
Tested up to: 6.2.2
Stable tag: 3.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This widget will display live football scores on your website, for a chosen competition or team.

== Description ==

Add live football scores to your WordPress website. To request a key sign up for your free trial at [statsfc.com](https://statsfc.com/sign-up).

For a demo, check out [wp.statsfc.com/live](https://wp.statsfc.com/live/).

= Translations =
* Bahasa Indonesia
* Dansk
* Deutsch
* Eesti
* Español
* Français
* Hrvatski Jezik
* Italiano
* Magyar
* Norsk bokmål
* Slovenčina
* Slovenski Jezik
* Suomi
* Svenska
* Türkçe

If you're interested in translating for us, please get in touch at [hello@statsfc.com](mailto:hello@statsfc.com) or on Twitter [@StatsFC](https://twitter.com/StatsFC).

== Installation ==

1. Upload the `statsfc-live` folder and all files to the `/wp-content/plugins/` directory
2. Activate the widget through the 'Plugins' menu in WordPress
3. Drag the widget to the relevant sidebar on the 'Widgets' page in WordPress
4. Set the StatsFC key and any other options. If you don't have a key, sign up for free at [statsfc.com](https://statsfc.com)

You can also use the `[statsfc-live]` shortcode, with the following options:

* `key` (required): Your StatsFC key
* `competition` (required*): Competition key, e.g., `EPL`
* `team` (required*): Team name, e.g., `Liverpool`
* `highlight` (optional): The name of the team you want to highlight, e.g., `Liverpool`
* `goals` (optional): Show goal scorers, `true` or `false`
* `assists` (optional): Show assists, `true` or `false`
* `show_badges` (optional): Display team badges, `true` or `false`
* `timezone` (optional): The timezone to convert match times to, e.g., `Europe/London` ([complete list](https://php.net/manual/en/timezones.php))
* `default_css` (optional): Use the default widget styles, `true` or `false`
* `omit_errors` (optional): Omit error messages, `true` or `false`

*Only one of `competition` or `team` is required.

== Frequently asked questions ==



== Screenshots ==



== Changelog ==

= 3.0.0 =
* Refactor: Update plugin for new API

= 2.16.2 =
* Hotfix: Prevent match scores from wrapping

= 2.16.1 =
* Hotfix: Possible issue loading language/CSS files

= 2.16.0 =
* Feature: Added `assists` parameter

= 2.15.1 =
* Hotfix: Check options exist before using them

= 2.15.0 =
* Feature: Show all matches for the current day by default (removed newly redundant `upcoming` option)
* Feature: Added `timezone` option

= 2.14.5 =
* Hotfix: Check highlight value against short and full team names

= 2.14.4 =
* Hotfix: Check the before/after widget/title bits exist before using them

= 2.14.3 =
* Hotfix: Load relevant language file based on the default language for the site

= 2.14.2 =
* Hotfix: Match event times should be single quoted, e.g., 10' instead of 10''

= 2.14.1 =
* Hotfix: Fixed missing team badges

= 2.14.0 =
* Feature: Added multi-language support. If you're interested in translating for us, please get in touch at [hello@statsfc.com](mailto:hello@statsfc.com)

= 2.13.2 =
* Hotfix: Added a responsive horizontal scroll if the widget is too wide for mobile

= 2.13.1 =
* Hotfix: Fixed possible `Undefined index: omit_errors` error

= 2.13.0 =
* Feature: Put CSS/JS files back into the local repo
* Feature: Enqueue style/script directly instead of registering first

= 2.12.0 =
* Feature: Added `omit_errors` parameter
* Feature: Load CSS/JS remotely

= 2.11.2 =
* Hotfix: Fixed "Invalid domain" bug caused by referal domain

= 2.11.1 =
* Hotfix: Fixed bug saving `competition` setting

= 2.11.0 =
* Feature: Authenticate requests for the automatic live score updates

= 2.10.2 =
* Hotfix: Fixed bug with boolean options

= 2.10.1 =
* Hotfix: Fixed bug with multiple widgets on one page

= 2.10.0 =
* Feature: Added `highlight`, `upcoming`, `goals` and `show_badges` options

= 2.9.0 =
* Feature: Allow more discrete ads for ad-supported accounts

= 2.8.0 =
* Feature: Enabled ad-support

= 2.7.0 =
* Feature: Use built-in WordPress HTTP API functions

= 2.5.0 =
* Feature: Added badge class for each team

= 2.4.0 =
* Feature: Default `default_css` parameter to `true`

= 2.3.0 =
* Feature: Updated team badges.

= 2.2.0 =
* Feature: Added `[statsfc-live]` shortcode.

= 2.1.0 =
* Feature: Tweaked CSS.

= 2.0.0 =
* Feature: Updated to use the new API.

= 1.7.0 =
* Feature: Tweaked error message.

= 1.6.0 =
* Feature: Update live match scores and statuses automatically.

= 1.5.0 =
* Feature: Added an option to show upcoming fixtures, starting within the next hour.

= 1.4.1 =
* Hotfix: Added missing "Missed penalty" icon.

= 1.4.0 =
* Feature: Added fopen fallback if cURL request fails.

= 1.3.1 =
* Hotfix: Fixed possible cURL bug.

= 1.3.0 =
* Feature: Use cURL to fetch API data if possible.

= 1.2.0 =
* Feature: Added Community Shield live scores.

= 1.1.1 =
* Hotfix: Fixed a bug when selecting a specific team.

= 1.1.0 =
* Feature: Separate control over whether to show goals, red cards and yellow cards.

= 1.0.1 =
* Hotfix: Live scores now showing.

== Upgrade notice ==

