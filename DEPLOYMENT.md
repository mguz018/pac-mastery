# Quick Deployment Guide

## 🚀 5-Minute Netlify Deployment

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Navigate to Project
```bash
cd pcc-mastery
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Connect to Netlify
```bash
netlify init
```
- Choose "Create & configure a new site"
- Pick a site name (e.g., `pcc-mastery-yourname`)

### 5. Set Stripe Keys
```bash
netlify env:set STRIPE_SECRET_KEY sk_test_your_key_here
netlify env:set STRIPE_PRICE_ID price_your_price_id_here
```

### 6. Deploy!
```bash
netlify deploy --prod
```

## 📋 Stripe Setup Checklist

- [ ] Create Stripe account at stripe.com
- [ ] Create product ($39.99 one-time payment)
- [ ] Copy Price ID (starts with `price_...`)
- [ ] Copy Secret Key from Developers → API Keys
- [ ] Use these in Step 5 above

## 🔧 Environment Variables Needed

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
```

## ✅ Testing Checklist

After deployment:
- [ ] Site loads without errors
- [ ] Can view landing page
- [ ] Can see questions after "purchasing" (use test mode)
- [ ] Questions display correctly
- [ ] Bookmarks work
- [ ] Analytics show data
- [ ] Full exam mode works

## 🧪 Stripe Test Cards

Use these in test mode:
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## 🔗 Important Links

- **Netlify Dashboard**: https://app.netlify.com
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Netlify Docs**: https://docs.netlify.com
- **Stripe Docs**: https://stripe.com/docs

## 💡 Quick Tips

1. **Test First**: Deploy in test mode before going live
2. **Custom Domain**: Add in Netlify → Domain settings
3. **SSL**: Automatically enabled by Netlify
4. **Updates**: Just push to Git or run `netlify deploy --prod`
5. **Logs**: Check Netlify → Functions for Stripe issues

## 🆘 Common Issues

**Build fails?**
- Run `npm install` first
- Check Node version (need 16+)

**Stripe not working?**
- Verify environment variables are set
- Check Netlify Functions logs
- Make sure using correct API keys

**Questions not loading?**
- Clear browser cache
- Check browser console for errors

---

Need help? Check README.md for full documentation.
