<?php

use App\Kernel;

require_once '/home2/desarrol/repositories/test/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
