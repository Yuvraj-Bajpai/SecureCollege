# Branch Strategy

## Main Branches

### `main` (Production)
- **Purpose**: Production-ready code
- **Auto-deploys**: Yes (Vercel production)
- **Protection**: Required reviews before merge
- **Deployment**: https://securecollege.in

### `staging` (Pre-production)
- **Purpose**: Testing before production
- **Auto-deploys**: Yes (Vercel preview)
- **Protection**: Optional reviews
- **Deployment**: Vercel staging URL

### `development` (Active Development)
- **Purpose**: Integration branch for features
- **Auto-deploys**: Yes (Vercel preview)
- **Protection**: None
- **Deployment**: Vercel preview URL

## Feature Branches

### Naming Convention
```
feature/<short-description>
```

### Examples
- `feature/user-dashboard`
- `feature/college-comparison`
- `feature/premium-subscription`

### Workflow
1. Create from `development`
2. Build feature
3. Create PR to `development`
4. After merge, create PR to `staging`
5. Test in staging
6. Merge to `main` for production

## Hotfix Branches

### Naming Convention
```
hotfix/<issue-description>
```

### Examples
- `hotfix/login-error`
- `hotfix/mobile-menu-bug`

### Workflow
1. Create from `main`
2. Fix urgent issue
3. Create PR to `main` immediately
4. Also merge to `development`
5. Deploy to production ASAP

## Best Practices

✅ Always update from target branch before PR  
✅ Keep branches small and focused  
✅ Write meaningful commit messages  
✅ Test locally before pushing  
✅ Run linter and build before PR  
✅ Review your own PR first  

❌ Don't push directly to `main`  
❌ Don't merge without testing  
❌ Don't skip code review  
❌ Don't leave branches open too long  

