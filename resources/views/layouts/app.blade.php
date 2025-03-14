<!DOCTYPE html>
<html lang="en" class="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 dark:text-white">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="{{asset('favicon.ico')}}" />
    <link rel="icon" type="image/svg+xml" href="{{asset('logo.svg')}}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Demo project showcasing use of the Randomuser API"
    />
    <link rel="apple-touch-icon" href="{{asset('logo192.png')}}" />
    <link rel="manifest" href="{{asset('manifest.json')}}" />
    <title>Erica's Random User Demo</title>
    @viteReactRefresh
    @vite('resources/js/index.jsx')
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">
    {{$slot}}
</div>
</body>
</html>
