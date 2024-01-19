M.GradingformERubric = {};

/**
 * This function is called for the e-rubric on grading page.
 * This function initializes the e-rubric and defines corresponding event handlers for all rubric levels.
 * @param {object} Y - The YUI Instance
 * @param [Object} options - The configuration options for the YUI instance
 */
M.GradingformERubric.init = function(Y, options) {
    Y.on('click', M.GradingformERubric.levelclick, '#erubric-' + options.name + ' .level', null, Y, options.name);
    // Capture also space and enter keypress.
    Y.on('key', M.GradingformERubric.levelclick, '#erubric-' + options.name + ' .level', 'space', Y, options.name);
    Y.on('key', M.GradingformERubric.levelclick, '#erubric-' + options.name + ' .level', 'enter', Y, options.name);

    Y.all('#erubric-' + options.name + ' .radio').setStyle('display', 'none');
    Y.all('#erubric-' + options.name + ' .level').each(function(node) {
    // Only for not enriched levels.
    if (!node.hasClass('currentenenriched') && node.one('input[type=radio]').get('checked')) {
        node.addClass('checked');
    }
    });

    // Change rubric container width according to the number of maximum levels, for better fit.
    var maxlevels = Y.one('.GradingformERubric').getAttribute('data-maxlevels');

    if (maxlevels >= 6) {
        Y.one('div[data-region=grade]').setStyle('maxWidth', '100%');
    } else if (maxlevels == 5) {
        Y.one('div[data-region=grade]').setStyle('maxWidth', '1029px');
    } else if (maxlevels == 4) {
        Y.one('div[data-region=grade]').setStyle('maxWidth', '955px');
    }

    // Change the left margin, for evaluation using Boost Theme
    if (Y.one('.GradingformERubric').hasClass('boost_theme')) {
        Y.one('div[data-fieldtype=grading]').setStyle('padding-left', 'unset');
        Y.one('div[data-fieldtype=grading]').setStyle('padding-right', 'unset');
    }
};

M.GradingformERubric.levelclick = function(e) {
    var el = e.target;
    while (el && !el.hasClass('level')) {
        el = el.get('parentNode');
    }

    // If this level is non existing or is already enriched, return.
    if (!el || el.hasClass('currentenenriched')) {
        return;
    }

    e.preventDefault();
    el.siblings().removeClass('checked');
    el.siblings().setAttribute('aria-checked', 'false');
    var chb = el.one('input[type=radio]');
    if (!chb.get('checked')) {
        chb.set('checked', true);
        el.addClass('checked');
        // Set aria-checked attribute to true if checked.
        el.setAttribute('aria-checked', 'true');
    } else {
        el.removeClass('checked');
        // Set aria-checked attribute to false if unchecked.
        el.setAttribute('aria-checked', 'false');
        el.get('parentNode').all('input[type=radio]').set('checked', false);
    }
};