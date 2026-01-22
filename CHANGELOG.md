# Changelog

## [1.5.0](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/compare/v1.4.0...v1.5.0) (2026-01-22)


### Features

* update aanvragen confirmation copy for self-booking flow ([#81](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/81)) ✨ ([ae10af4](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/ae10af429ad586370f647f1a07bcd32bc6b015f5))
* website design overhaul ✨ ([#89](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/89)) ([0c8cccd](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/0c8cccd98e1dea3039b90289ebaeede0aa9f2bee)), closes [#88](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/88)

## [1.4.0](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/compare/v1.3.0...v1.4.0) (2026-01-21)


### Features

* optimize critical request chain for faster page load ([#44](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/44)) ✨ ([c21da26](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/c21da26e331bfc5fbaf5099407a8572148fa02ef))
* swap portfolio section position on homepage ([#75](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/75)) ✨ ([1d06a56](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/1d06a5659de89f98c3f7f12b3b8cda3da5584a58))


### Bug Fixes

* **cls:** replace React TextReveal with CSS animation ([#73](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/73)) 🐛 ([8e98f00](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/8e98f00807ac37c4c6447389c36f72155c0ff338))
* fix heading hierarchy in OfferSection for accessibility ([#43](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/43)) 🐛 ([0c0a064](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/0c0a064f7aa98418a616328816675a62d03c71b3))
* fix render-blocking CSS ([#55](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/55)) 🐛 ([e6abac1](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/e6abac120463ad9e87f3ba74889f0bd325a1d531))
* **fonts:** import 700 weight via [@fontsource](https://github.com/fontsource) to fix TextReveal CLS ([#69](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/69)) 🐛 ([6f8b36e](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/6f8b36ed61311611036ad99b8e9409f901b78067))
* **fonts:** remove duplicate [@fontsource](https://github.com/fontsource) CSS imports ([#65](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/65)) 🐛 ([a75a36e](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/a75a36e853b44c4890647d13227d3a154d06f280))
* **fonts:** restore critical 900 weight import to prevent CLS ([#67](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/67)) 🐛 ([c0cca2c](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/c0cca2cbed077bd0fc24ec1c9a355f69fdd8edb9))
* **fonts:** use font-display optional with preloading to eliminate CLS ([#71](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/71)) 🐛 ([c3e9a2f](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/c3e9a2f5384dcb104b4cd23777b0df64a6c05118))
* improve contrast ratio on electric color elements ([#11](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/11)) 🐛 ([ea2a7ec](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/ea2a7ec7b9ebfe714a5df8ee8e8f19a448dbdb6e))
* improve homepage title to proper SEO length ([#79](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/79)) 🐛 ([39f584e](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/39f584ebf68728e40caa65ae6935c023b7726b4c))
* **lcp:** keep TextReveal text visible during hydration ([#63](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/63)) 🐛 ([6fb5aa9](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/6fb5aa95a3e81ac2f9fe6a4a51825dd70a1e9da9))
* reduce CLS from Inter Tight font loading ([#47](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/47)) 🐛 ([dd17442](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/dd174427cfd34bd6683e2379981da6996deb6c64))
* reduce CLS from Inter Tight font loading in hero section ([#59](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/59)) 🐛 ([47694bb](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/47694bbcc8174fdd99c9ad30f5253fe22027ee83))
* remove redundant client:visible from HorizontalProjectScroll ([#57](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/57)) 🐛 ([37f73ff](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/37f73ffe20297f2d5d5e3cb3ac30189dc9fb0b63))
* **seo:** add self-referencing canonical URL to Layout 🐛 ([f282440](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/f282440198dc9c9f3462fa7e33d3510b8a7492ed))
* update meta description with correct price and proper length ([#77](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/77)) 🐛 ([2db9798](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/2db9798a26631c614800b59a386fa7e37b41978d))


### Performance Improvements

* defer JS hydration to reduce unused JavaScript ([#51](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/51)) ⚡ ([9c558be](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/9c558be725fc572771e9984ca03efb7cead80dd6))
* enable clientPrerender for speculative link preloading ([#61](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/61)) ⚡ ([04dd5c7](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/04dd5c7fc8ed4e62000ef376457b03f976c91d96))
* improve FCP, LCP, and Speed Index ([#52](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/52)) ⚡ ([a83488b](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/a83488be586ffaa71c98680b90aac24bba17866e))

## [1.3.0](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/compare/v1.2.0...v1.3.0) (2026-01-20)


### Features

* add portfolio section with horizontal scroll ([#36](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/36)) ✨ ([0aa65d4](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/0aa65d4964d867be44e688bc718eb3e1150c339f))
* add Schildersbedrijf Visser concept project to portfolio ([#37](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/37)) ✨ ([8b8e13e](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/8b8e13e6ed082cd9529d911ce87b6c027ff6894d))


### Bug Fixes

* calendar not appearing when entering aanvragen from location pages ([#41](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/41)) ([3b97a0e](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/3b97a0e2c96e8e389cec354617cb31bb4d623fdd))
* normalize datetime comparisons in booking queries ([#28](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/28)) ([1431fed](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/1431fedea059c7f088ba06874e38aa13b7db72ad))
* resolve 500 error on city landing pages ([#34](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/34)) 🐛 ([f3580c3](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/f3580c3db498649c8f49836eb3485a06d348cb81)), closes [#33](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/33)
* update Fitcity Culemborg label from 'live' to 'concept' ([#35](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/35)) ([f698e6a](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/f698e6afff57be14484f9bf2c7a135610eb51041))

## [1.2.0](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/compare/v1.1.1...v1.2.0) (2026-01-20)


### Features

* implement in-house booking system ([#24](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/24)) ✨ ([782c51f](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/782c51f53de737895e3c08801596d00faf27254e))


### Bug Fixes

* adjust text wrapping on aanvragen page to break after first sentence ([#21](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/21)) ([bd9d2be](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/bd9d2bee554a21418ed01e8e24bab94b84fca391))

## [1.1.1](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/compare/v1.1.0...v1.1.1) (2026-01-18)


### Performance Improvements

* optimize favicon SVG with SVGO ([#13](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/13)) ([19e5973](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/commit/19e5973921b90932163286bc9d91484d1b0c493d)), closes [#5](https://github.com/KNAPGEMAAKTNL-Projects/knapgemaakt.nl/issues/5)

## [1.1.0](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/compare/v1.0.2...v1.1.0) (2026-01-16)


### Features

* implement custom 404 error page ([#7](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/issues/7)) ([#8](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/issues/8)) ([aef4616](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/aef4616620ce807940e826743a7361d58a82e296))

## [1.0.2](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/compare/v1.0.1...v1.0.2) (2026-01-15)


### Bug Fixes

* **ci:** add step to create GitHub release after PR merge ([c2c3f17](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/c2c3f17d7afbeee06efd89b1f34a9cf9cb4072af))
* **ci:** remove duplicate release creation step ([1c5e77d](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/1c5e77da390723e09c719717b9e63ab6b63f8a4d))

## [1.0.1](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/compare/v1.0.0...v1.0.1) (2026-01-15)


### Bug Fixes

* add XML sitemap generation with correct Content-Type header ([#2](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/issues/2)) ([#3](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/issues/3)) ([c283fcd](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/c283fcd44853c6874d2113ef75347232bc4c950b))
* **ci:** add checkout step before pr merge in release workflow ([def2bd2](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/def2bd2a3f754583ad4e5bcb2cd09009dbff5fcc))
* **ci:** extract PR number from Release Please JSON output ([fc8928b](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/fc8928b22fa8e545521a397df86c13c34168a8db))

## 1.0.0 (2026-01-15)


### Features

* build complete website with lead generation flow ✨ ([8e93cef](https://github.com/KNAPGEMAAKTNL/knapgemaakt.nl/commit/8e93cef46c517b60276e37cd9999b1f14b0704c3))
