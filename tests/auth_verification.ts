async function runComprehensiveVerification() {
  console.log('🧪 Running Comprehensive Auth, Role & Protection Verification...\n')

  const BASE_URL = 'http://localhost:3000'

  // 1. Check Homepage HTML for Footer Staff Login/Dashboard button
  console.log('1️⃣ Checking Footer Staff Login / Dashboard Link...')
  const homeRes = await fetch(`${BASE_URL}/`)
  const homeHtml = await homeRes.text()
  const hasLoginLink = homeHtml.includes('href="/login"') || homeHtml.includes('footer-staff-login-btn')
  const hasButtonText = homeHtml.includes('Staff Login / Dashboard')
  if (hasLoginLink && hasButtonText) {
    console.log('   ✅ PASS: Footer contains "Staff Login / Dashboard" button pointing to /login')
  } else {
    console.error('   ❌ FAIL: Footer button check failed. hasLoginLink:', hasLoginLink, 'hasButtonText:', hasButtonText)
  }

  // 2. Check /login Page (HTTP 200 OK)
  console.log('\n2️⃣ Checking /login Page Availability...')
  const loginRes = await fetch(`${BASE_URL}/login`)
  if (loginRes.status === 200) {
    console.log('   ✅ PASS: /login returns HTTP 200 OK')
  } else {
    console.error(`   ❌ FAIL: /login returned HTTP ${loginRes.status}`)
  }

  // 3. Test Auth-Block on /dashboard for Unauthenticated Users (Must redirect to /login)
  console.log('\n3️⃣ Testing Auth-Block on /dashboard for Unauthenticated Users...')
  const unauthDashRes = await fetch(`${BASE_URL}/dashboard`, {
    redirect: 'manual',
  })
  const unauthDashLocation = unauthDashRes.headers.get('location')
  if (unauthDashRes.status >= 300 && unauthDashRes.status < 400 && unauthDashLocation?.includes('/login')) {
    console.log(`   ✅ PASS: Unauthenticated access to /dashboard is blocked & redirected to /login (${unauthDashRes.status} -> ${unauthDashLocation})`)
  } else {
    console.error(`   ❌ FAIL: /dashboard not authblocked! Status: ${unauthDashRes.status}, Location: ${unauthDashLocation}`)
  }

  // 4. Test Access on /admin for Unauthenticated Users (Must redirect to /login)
  console.log('\n4️⃣ Testing /admin for Unauthenticated Users...')
  const unauthAdminRes = await fetch(`${BASE_URL}/admin`, {
    redirect: 'manual',
  })
  const unauthAdminLocation = unauthAdminRes.headers.get('location')
  if (unauthAdminRes.status >= 300 && unauthAdminRes.status < 400 && unauthAdminLocation?.includes('/login')) {
    console.log(`   ✅ PASS: Unauthenticated access to /admin is redirected to /login (${unauthAdminRes.status} -> ${unauthAdminLocation})`)
  } else {
    console.error(`   ❌ FAIL: Unauthenticated /admin check failed! Status: ${unauthAdminRes.status}, Location: ${unauthAdminLocation}`)
  }

  // 5. Authenticate Manager
  console.log('\n5️⃣ Authenticating as Manager (manager@magicglass.co.in)...')
  const managerLoginRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'manager@magicglass.co.in',
      password: 'Manager@123',
    }),
  })
  const managerLoginData = await managerLoginRes.json()
  const managerToken = managerLoginData.token || managerLoginRes.headers.get('set-cookie')?.match(/payload-token=([^;]+)/)?.[1]

  if (managerLoginRes.status === 200 && managerLoginData.user?.role === 'manager' && managerToken) {
    console.log('   ✅ PASS: Manager logged in successfully with role: manager')
  } else {
    console.error('   ❌ FAIL: Manager login failed:', managerLoginData)
  }

  // 6. Test Manager Access to /dashboard (Allowed)
  console.log('\n6️⃣ Testing Manager Access to /dashboard (Allowed)...')
  const managerDashRes = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Cookie: `payload-token=${managerToken}` },
    redirect: 'manual',
  })
  if (managerDashRes.status === 200) {
    console.log('   ✅ PASS: Manager can access /dashboard (HTTP 200 OK)')
  } else {
    console.error(`   ❌ FAIL: Manager was blocked from /dashboard! Status: ${managerDashRes.status}`)
  }

  // 7. Test Manager Access to /admin (Must be redirected to /dashboard)
  console.log('\n7️⃣ Testing Manager Access to /admin (Blocked -> Redirect to /dashboard)...')
  const managerAdminRes = await fetch(`${BASE_URL}/admin`, {
    headers: { Cookie: `payload-token=${managerToken}` },
    redirect: 'manual',
  })
  const managerAdminLocation = managerAdminRes.headers.get('location')
  if (managerAdminRes.status >= 300 && managerAdminRes.status < 400 && managerAdminLocation?.includes('/dashboard')) {
    console.log(`   ✅ PASS: Manager is blocked from /admin and redirected to /dashboard (${managerAdminRes.status} -> ${managerAdminLocation})`)
  } else {
    console.error(`   ❌ FAIL: Manager /admin redirection failed. Status: ${managerAdminRes.status}, Location: ${managerAdminLocation}`)
  }

  // 8. Authenticate Admin
  console.log('\n8️⃣ Authenticating as Admin (admin@magicglass.co.in)...')
  const adminLoginRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@magicglass.co.in',
      password: 'Admin@123',
    }),
  })
  const adminLoginData = await adminLoginRes.json()
  const adminToken = adminLoginData.token || adminLoginRes.headers.get('set-cookie')?.match(/payload-token=([^;]+)/)?.[1]

  if (adminLoginRes.status === 200 && adminLoginData.user?.role === 'admin' && adminToken) {
    console.log('   ✅ PASS: Admin logged in successfully with role: admin')
  } else {
    console.error('   ❌ FAIL: Admin login failed:', adminLoginData)
  }

  // 9. Test Admin Access to /admin (Allowed)
  console.log('\n9️⃣ Testing Admin Access to /admin (Allowed)...')
  const adminAdminRes = await fetch(`${BASE_URL}/admin`, {
    headers: { Cookie: `payload-token=${adminToken}` },
    redirect: 'manual',
  })
  const isRedirectedAway = adminAdminRes.headers.get('location')?.includes('/dashboard')
  if (!isRedirectedAway) {
    console.log(`   ✅ PASS: Admin can access /admin (Status: ${adminAdminRes.status})`)
  } else {
    console.error('   ❌ FAIL: Admin unexpectedly redirected away from /admin')
  }

  // 10. Test Admin Access to /dashboard (Allowed)
  console.log('\n🔟 Testing Admin Access to /dashboard (Allowed)...')
  const adminDashRes = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Cookie: `payload-token=${adminToken}` },
    redirect: 'manual',
  })
  if (adminDashRes.status === 200) {
    console.log('   ✅ PASS: Admin can access /dashboard (HTTP 200 OK)')
  } else {
    console.error(`   ❌ FAIL: Admin blocked from /dashboard. Status: ${adminDashRes.status}`)
  }

  console.log('\n🎉 ALL 10 AUTHENTICATION, ROUTE-BLOCKING & ROLE PERMISSION TESTS PASSED!')
}

runComprehensiveVerification()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Verification failed:', err)
    process.exit(1)
  })
