# PR Marketing Ventures — Project Rules & Guidelines

## 1. Company Information & Office Address (LOCKED & IMMUTABLE)
- **Official Address**: `B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009, India`
- **Unit Number**: **`B-903`** is the only correct unit number.
- **NEVER use `B-910` or `B-909`**.
- **Single Source of Truth**: `website/lib/site.ts` (`site.location`). All components, footers, contact pages, and schemas must reference `site.location` or match `B-903` strictly.

## 2. Deployment Guidelines
- **Deploy Command**: `python deploy_to_hostinger.py`
- The deploy script contains an automated pre-flight integrity check that validates `B-903` presence in build output and halts if any outdated unit number (`B-910`/`B-909`) is detected.
- Build mode is Next.js static export (`output: 'export'`) served by Hostinger LiteSpeed/Apache from `public_html`.
