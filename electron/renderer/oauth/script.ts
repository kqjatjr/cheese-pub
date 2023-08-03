if (window.opener) {
  const searchParams = new URLSearchParams(window.location.search);
  window.opener.postMessage({
    code: searchParams.get('code'),
  });
}
