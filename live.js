/* global statsfc_lang */

var $j = jQuery;

function StatsFC_Live (key) {
  this.referer = '';
  this.key = key;
  this.competition = '';
  this.group = '';
  this.team = '';
  this.highlight = '';
  this.goals = false;
  this.assists = false;
  this.showBadges = false;
  this.timezone = '';
  this.omitErrors = false;
  this.useDefaultCss = false;
  this.lang = 'en';

  this.translate = function (key) {
    if (
      typeof statsfc_lang === 'undefined' ||
      typeof statsfc_lang[key] === 'undefined' ||
      statsfc_lang[key].length === 0
    ) {
      return key;
    }

    return statsfc_lang[key];
  };

  this.display = function (placeholder) {
    this.loadLang('statsfc-lang', this.lang);

    var $placeholder;

    switch (typeof placeholder) {
      case 'string':
        $placeholder = $j('#' + placeholder);
        break;
      case 'object':
        $placeholder = placeholder;
        break;
      default:
        return;
    }

    if ($placeholder.length === 0) {
      return;
    }

    if (this.useDefaultCss === true || this.useDefaultCss === 'true') {
      this.loadCss('statsfc-live-css');
    }

    if (typeof this.referer !== 'string' || this.referer.length === 0) {
      this.referer = window.location.hostname;
    }

    var $container = $j('<div>').addClass('sfc_live');

    // Store globals variables here so we can use it later.
    var key = this.key;
    var referer = this.referer;
    var competition = this.competition;
    var highlight = this.highlight;
    var goals = (this.goals === true || this.goals === 'true');
    var assists = (this.assists === true || this.assists === 'true');
    var showBadges = (this.showBadges === true || this.showBadges === 'true');
    var omitErrors = (this.omitErrors === true || this.omitErrors === 'true');
    var translate = this.translate;

    $j.getJSON(
      'https://widgets.statsfc.com/api/live.json?callback=?',
      {
        key: this.key,
        domain: this.referer,
        competition: this.competition,
        group: this.group,
        team: this.team,
        goals: this.goals,
        assists: this.assists,
        timezone: this.timezone,
        lang: this.lang,
      },
      function (data) {
        if (data.error) {
          if (omitErrors) {
            return;
          }

          var $error = $j('<p>').css('text-align', 'center');

          if (data.customer && data.customer.attribution) {
            $error.append(
              $j('<a>').attr({
                href: 'https://statsfc.com',
                title: 'Football widgets and API',
                target: '_blank',
              }).text('Stats FC'),
              ' – ',
            );
          }

          $error.append(translate(data.error));

          $container.append($error);

          return;
        }

        var $table = $j('<table>');
        var $thead = $j('<thead>');
        var $tbody = $j('<tbody>');

        $thead.append(
          $j('<tr>').append(
            $j('<th>').attr('colspan', 5).text(translate('Live')),
          ),
        );

        $j.each(data.matches, function (key, match) {
          var $row = $j('<tr>').attr('id', 'sfc_' + match.id);
          var $home = $j('<td>').addClass('sfc_team sfc_home sfc_badge_' + match.homepath).text(match.home);
          var $homeScore = $j('<td>').addClass('sfc_homeScore');
          var $awayScore = $j('<td>').addClass('sfc_awayScore');
          var $away = $j('<td>').addClass('sfc_team sfc_away sfc_badge_' + match.awaypath).text(match.away);

          if (match.started) {
            $homeScore.text(match.score[0]);
            $awayScore.text(match.score[1]);
          }

          if (showBadges) {
            $home.addClass('sfc_badge').css('background-image', 'url(https://cdn.statsfc.com/kit/' + match.homeshirt + ')');
            $away.addClass('sfc_badge').css('background-image', 'url(https://cdn.statsfc.com/kit/' + match.awayshirt + ')');
          }

          if (highlight === match.home || highlight === match.homefull) {
            $home.addClass('sfc_highlight');
          } else if (highlight === match.away || highlight === match.awayfull) {
            $away.addClass('sfc_highlight');
          }

          $home.prepend(
            $j('<span>').addClass('sfc_status').text(translate(match.status)),
          );

          if (competition.length === 0) {
            $away.append(
              $j('<span>').addClass('sfc_competition').append(
                $j('<abbr>').attr('title', match.competition).text(match.competitionkey),
              ),
            );
          }

          $row.append(
            $home,
            $homeScore,
            $j('<td>').addClass('sfc_vs').text('-'),
            $awayScore,
            $away,
          );

          $tbody.append($row);

          if (goals && match.events.length > 0) {
            $j.each(match.events, function (key, e) {
              var $row = $j('<tr>').addClass('sfc_incident');
              var $home = $j('<td>').addClass('sfc_home').attr('colspan', 2).text(e.home);
              var $minute = $j('<td>').addClass('sfc_vs').text(e.minute);
              var $away = $j('<td>').addClass('sfc_away').attr('colspan', 2).text(e.away);

              if (e.home.length > 0) {
                $home.addClass('sfc_' + e.type);

                if (assists && e.assist.length > 0) {
                  $home.append('<span><small> (' + translate('Ast.') + ' ' + e.assist + ')</small></span>');
                }
              } else if (e.away.length > 0) {
                $away.addClass('sfc_' + e.type);

                if (assists && e.assist.length > 0) {
                  $away.append('<span><small> (' + translate('Ast.') + ' ' + e.assist + ')</small></span>');
                }
              }

              $row.append(
                $home,
                $minute,
                $away,
              );

              $tbody.append($row);
            });
          }
        });

        $table.append($thead, $tbody);

        $container.append($table);

        if (data.customer.attribution) {
          $container.append(
            $j('<div>').attr('class', 'sfc_footer').append(
              $j('<p>').append(
                $j('<small>').append('Powered by ').append(
                  $j('<a>').attr({
                    href: 'https://statsfc.com',
                    title: 'StatsFC – Football widgets',
                    target: '_blank',
                  }).text('StatsFC.com'),
                ),
              ),
            ),
          );
        }
      },
    );

    $placeholder.append($container);

    setInterval(function () {
      $j.getJSON(
        'https://widgets.statsfc.com/api/live-updates.json?callback=?',
        {
          key: key,
          domain: referer,
        },
        function (data) {
          $j.each(data, function (match_id, score) {
            $j('#sfc_' + match_id + ' .sfc_homeScore').text(score[0]);
            $j('#sfc_' + match_id + ' .sfc_awayScore').text(score[1]);
            $j('#sfc_' + match_id + ' .sfc_status').text(score[2]);
          });
        },
      );
    }, 60000);
  };

  this.loadCss = function (id) {
    if (document.getElementById(id)) {
      return;
    }

    var css, fcss = (document.getElementsByTagName('link')[0] || document.getElementsByTagName('script')[0]);

    css = document.createElement('link');
    css.id = id;
    css.rel = 'stylesheet';
    css.href = 'https://cdn.statsfc.com/css/live.css';

    fcss.parentNode.insertBefore(css, fcss);
  };

  this.loadLang = function (id, l) {
    if (document.getElementById(id)) {
      return;
    }

    var lang, flang = document.getElementsByTagName('script')[0];

    lang = document.createElement('script');
    lang.id = id;
    lang.src = 'https://cdn.statsfc.com/js/lang/' + l + '.js';

    flang.parentNode.insertBefore(lang, flang);
  };
}

/**
 * Load widgets dynamically using data-* attributes
 */
$j('div.statsfc-live').each(function () {
  var key = $j(this).attr('data-key'),
    live = new StatsFC_Live(key),
    data = $j(this).data();

  for (var i in data) {
    live[i] = data[i];
  }

  live.display($j(this));
});
