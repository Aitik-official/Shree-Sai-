'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Menu, X, ChevronDown, ChevronRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useInquiryForm } from "../contexts/InquiryFormContext";
import { SITE_NAME, LOGO_SRC } from "@/lib/branding";
import { PACKAGE_NAV_GROUPS, getGroupPageHref } from "@/lib/packageExperienceCategories";
import { useCategoryLabels } from "@/contexts/CategoryLabelsContext";

interface NavPackageItem {
  _id: string;
  title: string;
  subtitle?: string;
  duration?: string;
  location?: string;
  place?: string;
  packageCategory?: string;
  price?: number;
  rating?: number;
  images?: Array<{ url: string; alt?: string }>;
}

type NavSubItem = { name: string; href: string; isFuture?: boolean };
type NavItem = {
  name: string;
  href: string;
  submenu?: NavSubItem[];
  packageGroups?: typeof PACKAGE_NAV_GROUPS;
};

const NavbarTravel = () => {
  const { navGroups } = useCategoryLabels();
  const [allPackages, setAllPackages] = useState<NavPackageItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/packages')
      .then((res) => res.json())
      .then((result) => {
        if (isMounted && result.success && Array.isArray(result.data)) {
          setAllPackages(result.data);
        }
      })
      .catch((err) => console.error('Failed to load navbar packages:', err));
    return () => {
      isMounted = false;
    };
  }, []);

  const generatePackageSlug = (title: string, id: string) => {
    const safeTitle = (title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return safeTitle ? `${safeTitle}-${id}` : id;
  };

  const getPackagesForGroup = useCallback(
    (groupSlug?: string, groupLabel?: string) => {
      if (!groupSlug && !groupLabel) return [];
      const s = (groupSlug || '').toLowerCase();
      const l = (groupLabel || '').toLowerCase();
      return allPackages.filter((pkg) => {
        const cat = (pkg.packageCategory || '').toLowerCase();
        const place = (pkg.place || '').toLowerCase();
        const loc = (pkg.location || '').toLowerCase();
        const title = (pkg.title || '').toLowerCase();
        return (
          cat === s ||
          cat === l ||
          place === s ||
          place === l ||
          loc.includes(s) ||
          loc.includes(l) ||
          title.includes(s) ||
          title.includes(l)
        );
      });
    },
    [allPackages]
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [hoveredPackageGroup, setHoveredPackageGroup] = useState<string | null>(null);
  const [hoveredPackageSub, setHoveredPackageSub] = useState<string | null>(null);
  const [contactHovered, setContactHovered] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<string[]>([]);
  const [mobileOpenSubs, setMobileOpenSubs] = useState<string[]>([]);
  const openDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { openForm } = useInquiryForm();

  const isBlogDetail = Boolean(pathname?.startsWith('/blogs/') && pathname !== '/blogs');
  // Package detail URLs end with a MongoDB id — light card hero needs solid nav (not white-on-beige)
  const isPackageDetail = /\/packages\/(?:.+-)?[a-f0-9]{24}$/i.test(pathname || '');
  const useSolidNav = isScrolled || isBlogDetail || isPackageDetail || isMenuOpen;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobilePackagesOpen(false);
      setMobileOpenGroups([]);
      setMobileOpenSubs([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMobileGroup = (slug: string) => {
    setMobileOpenGroups((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleMobileSub = (slug: string) => {
    setMobileOpenSubs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdownIndex(null);
    setHoveredIndex(null);
    setHoveredPackageGroup(null);
    setHoveredPackageSub(null);
  }, []);

  const openPackageDropdown = useCallback((index: number, packageGroups: typeof PACKAGE_NAV_GROUPS) => {
    setOpenDropdownIndex(index);
    setHoveredIndex(index);
    const firstGroup = packageGroups[0];
    setHoveredPackageGroup(firstGroup?.slug ?? null);
    setHoveredPackageSub(firstGroup?.items[0]?.slug ?? null);
  }, []);

  useEffect(() => {
    closeDropdown();
  }, [pathname, closeDropdown]);

  useEffect(() => {
    if (openDropdownIndex === null) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (openDropdownRef.current?.contains(event.target as Node)) return;
      closeDropdown();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDropdown();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdownIndex, closeDropdown]);

  const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Packages',
      href: '/packages',
      packageGroups: navGroups,
    },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const isActive = (href: string, submenu?: NavSubItem[], packageGroups?: typeof PACKAGE_NAV_GROUPS) => {
    if (href === '/') return pathname === '/';
    if (packageGroups?.length) {
      const groupHrefs = packageGroups.flatMap((group) => [
        getGroupPageHref(group.slug),
        ...group.items.flatMap((item) => [
          item.href,
          ...(item.miniItems?.map((mini) => mini.href) ?? []),
        ]),
      ]);
      return (
        pathname === href ||
        pathname?.startsWith(`${href}/`) ||
        groupHrefs.some((itemHref) => pathname === itemHref || pathname?.startsWith(`${itemHref}/`))
      );
    }
    if (submenu?.length) {
      return (
        pathname === href ||
        pathname?.startsWith(`${href}/`) ||
        submenu.some((item) => pathname === item.href || pathname?.startsWith(`${item.href}/`))
      );
    }
    return pathname === href || pathname?.startsWith(`${href}/`) || false;
  };

  const isContactActive = isActive('/contact');

  const isHighlighted = (index: number, active: boolean) =>
    active || hoveredIndex === index || openDropdownIndex === index;

  const isDropdownOpen = (index: number) => openDropdownIndex === index;

  const navItemClass = (highlighted: boolean) =>
    useSolidNav
      ? `relative z-10 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bd9245]/40 ${
          highlighted
            ? 'bg-[#bd9245]/10 text-[#bd9245] font-bold'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`
      : `relative z-10 px-2 py-1 text-sm font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
          highlighted
            ? 'text-white font-semibold'
            : 'text-white/85 hover:text-white'
        }`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    
    router.push(`/packages?search=${encodeURIComponent(searchQuery)}`);
    
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useSolidNav
      ? 'bg-white/95 backdrop-blur-md shadow-lg'
      : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 relative z-50 group py-1">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px] shrink-0 bg-white/85 rounded-full p-0.5 shadow-sm border border-white/50 transition-transform duration-300 group-hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src={LOGO_SRC}
                  alt={SITE_NAME}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-base sm:text-lg md:text-xl font-[900] tracking-tight leading-tight uppercase transition-colors ${
                useSolidNav ? 'text-gray-900' : 'text-white drop-shadow-md'
              }`}>
                SHRI SAI
              </span>
              <span className={`text-[10px] sm:text-[11px] md:text-xs font-extrabold tracking-[0.2em] uppercase leading-none transition-colors ${
                useSolidNav ? 'text-[#bd9245]' : 'text-amber-300 drop-shadow-sm'
              }`}>
                TOURS &amp; TRAVELS
              </span>
            </div>
          </Link>

          {/* Centered Navigation Pill */}
          <div className={`hidden lg:flex items-center justify-center flex-1 transition-all duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}`}>
            <div className={`relative flex items-center gap-6 xl:gap-8 ${
              useSolidNav
                ? 'rounded-full px-2 py-1.5 bg-gray-100/90 border border-gray-200/80'
                : ''
            }`}>
              {navigation.map((item, index) => {
                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (pathname === '/' && item.href === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                };

                const active = isActive(item.href, item.submenu, item.packageGroups);
                const highlighted = isHighlighted(index, active);

                if (item.packageGroups?.length) {
                  const dropdownOpen = isDropdownOpen(index);
                  const activeGroup = hoveredPackageGroup
                    ? item.packageGroups.find((g) => g.slug === hoveredPackageGroup)
                    : item.packageGroups[0];
                  const activeSub =
                    activeGroup?.items.find((s) => s.slug === hoveredPackageSub) ??
                    activeGroup?.items[0];
                  const activeMinis = activeSub?.miniItems ?? [];
                  const showMiniColumn = Boolean(activeMinis.length);

                  return (
                    <div
                      key={item.name}
                      ref={dropdownOpen ? openDropdownRef : null}
                      className="relative"
                      onMouseEnter={() => openPackageDropdown(index, item.packageGroups!)}
                      onMouseLeave={closeDropdown}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        aria-expanded={dropdownOpen}
                        className={`${navItemClass(highlighted)} inline-flex items-center gap-1`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            dropdownOpen ? 'rotate-180' : ''
                          } ${useSolidNav && highlighted ? 'text-gray-700' : ''}`}
                        />
                      </Link>
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60] transition-all duration-200 ${
                          dropdownOpen
                            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                            : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div
                          className="w-[min(92vw,720px)] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <div className="flex">
                            {/* Column 1 — Experience groups */}
                            <div className="w-[200px] shrink-0 bg-[#faf8f3] border-r border-gray-100 py-3">
                              <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                Categories
                              </p>
                              {item.packageGroups.map((group) => {
                                const isGroupActive = activeGroup?.slug === group.slug;
                                return (
                                  <Link
                                    key={group.slug}
                                    href={getGroupPageHref(group.slug)}
                                    className={`mx-2 mb-0.5 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                                      isGroupActive
                                        ? 'bg-white text-[#bd9245] shadow-sm'
                                        : 'text-gray-700 hover:bg-white/70 hover:text-gray-900'
                                    }`}
                                    onMouseEnter={() => {
                                      setHoveredPackageGroup(group.slug);
                                      setHoveredPackageSub(group.items[0]?.slug ?? null);
                                    }}
                                    onClick={() => closeDropdown()}
                                  >
                                    <span>{group.label}</span>
                                    <ChevronRight
                                      className={`h-4 w-4 shrink-0 ${
                                        isGroupActive ? 'text-[#bd9245]' : 'text-gray-300'
                                      }`}
                                    />
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Column 2 — Experiences (always clickable) */}
                            <div className="flex-1 min-w-0 py-3 max-h-[420px] overflow-y-auto">
                              <div className="px-4 pb-2 flex items-center justify-between gap-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                  {activeGroup?.label || 'Experiences'}
                                </p>
                                {activeGroup ? (
                                  <Link
                                    href={getGroupPageHref(activeGroup.slug)}
                                    onClick={() => closeDropdown()}
                                    className="text-[10px] font-bold uppercase tracking-wider text-[#bd9245] hover:underline"
                                  >
                                    View all
                                  </Link>
                                ) : null}
                              </div>
                                <div className="px-2 space-y-1">
                                  {/* Subcategories */}
                                  {activeGroup?.items.map((sub) => {
                                    const isSubActive = activeSub?.slug === sub.slug;
                                    const hasMinis = Boolean(sub.miniItems?.length);
                                    return (
                                      <div
                                        key={sub.slug}
                                        className={`rounded-xl transition-colors ${
                                          isSubActive ? 'bg-[#bd9245]/10' : 'hover:bg-gray-50'
                                        }`}
                                        onMouseEnter={() => setHoveredPackageSub(sub.slug)}
                                      >
                                        <Link
                                          href={sub.href}
                                          onClick={() => closeDropdown()}
                                          className={`flex items-center justify-between gap-2 px-3 py-2.5 text-sm ${
                                            isSubActive
                                              ? 'text-[#bd9245] font-semibold'
                                              : 'text-gray-700'
                                          }`}
                                        >
                                          <span className="leading-snug">{sub.label}</span>
                                          <span className="flex items-center gap-1.5 shrink-0">
                                            {sub.isFuture ? (
                                              <span className="text-[9px] font-bold uppercase tracking-wide text-amber-700/80 bg-amber-50 px-1.5 py-0.5 rounded">
                                                Soon
                                              </span>
                                            ) : null}
                                            {hasMinis ? (
                                              <ChevronRight className="h-4 w-4 text-gray-300" />
                                            ) : null}
                                          </span>
                                        </Link>
                                      </div>
                                    );
                                  })}

                                  {/* Assigned Packages */}
                                  {getPackagesForGroup(activeGroup?.slug, activeGroup?.label).map((pkg) => {
                                    const pkgSlug = generatePackageSlug(pkg.title, pkg._id);
                                    const pkgHref = `/packages/${pkgSlug}`;
                                    const isPkgActive = pathname === pkgHref || pathname?.includes(pkg._id);
                                    return (
                                      <Link
                                        key={pkg._id}
                                        href={pkgHref}
                                        onClick={() => closeDropdown()}
                                        className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                                          isPkgActive ? 'bg-[#bd9245]/10 text-[#bd9245]' : 'hover:bg-gray-50 text-gray-800'
                                        }`}
                                      >
                                        {pkg.images && pkg.images.length > 0 && pkg.images[0].url ? (
                                          <div className="w-12 h-12 relative rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                            <Image
                                              src={pkg.images[0].url}
                                              alt={pkg.images[0].alt || pkg.title}
                                              fill
                                              className="object-cover"
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                                            <Compass className="w-5 h-5 text-[#bd9245]" />
                                          </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                          <h4 className="text-xs font-bold truncate leading-snug">{pkg.title}</h4>
                                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
                                            {pkg.duration && <span>{pkg.duration}</span>}
                                            {pkg.duration && pkg.rating && <span>•</span>}
                                            {pkg.rating ? (
                                              <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                                                ★ {pkg.rating}
                                              </span>
                                            ) : null}
                                          </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" />
                                      </Link>
                                    );
                                  })}

                                  {/* Empty fallback if neither subcategories nor packages exist */}
                                  {(!activeGroup?.items || activeGroup.items.length === 0) &&
                                    getPackagesForGroup(activeGroup?.slug, activeGroup?.label).length === 0 && (
                                    <div className="px-4 py-8 text-center">
                                      <p className="text-xs text-gray-500 mb-3 font-medium">Explore all curated {activeGroup?.label} packages</p>
                                      <Link
                                        href={getGroupPageHref(activeGroup?.slug || '')}
                                        onClick={() => closeDropdown()}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#111827] text-white text-xs font-bold rounded-xl hover:bg-[#bd9245] transition-colors shadow-sm"
                                      >
                                        Explore {activeGroup?.label} <ChevronRight className="h-3.5 w-3.5" />
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>

                            {/* Column 3 — Only when mini options exist */}
                            {showMiniColumn ? (
                              <div className="w-[200px] shrink-0 border-l border-gray-100 bg-white py-3 max-h-[420px] overflow-y-auto">
                                <p className="px-4 pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                  Options
                                </p>
                                <div className="px-2 space-y-0.5">
                                  {activeMinis.map((mini) => (
                                    <Link
                                      key={mini.slug}
                                      href={mini.href}
                                      onClick={() => closeDropdown()}
                                      className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                        pathname === mini.href
                                          ? 'bg-[#bd9245]/10 text-[#bd9245] font-semibold'
                                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#bd9245]'
                                      }`}
                                    >
                                      {mini.label}
                                    </Link>
                                  ))}
                                </div>
                                {activeSub ? (
                                  <Link
                                    href={activeSub.href}
                                    onClick={() => closeDropdown()}
                                    className="mx-2 mt-2 block rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#bd9245] hover:bg-[#bd9245]/5"
                                  >
                                    See all in {activeSub.label.split('&')[0].trim()}
                                  </Link>
                                ) : null}
                              </div>
                            ) : null}
                          </div>

                          {/* Footer CTA — always visible */}
                          <div className="flex items-center justify-between gap-4 border-t border-gray-100 bg-[#faf8f3] px-4 py-3">
                            <p className="text-xs text-gray-500 hidden sm:block">
                              Browse curated adventure experiences across India & beyond
                            </p>
                            <Link
                              href="/packages"
                              onClick={() => closeDropdown()}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#bd9245] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white hover:bg-[#a07835] transition-colors ml-auto"
                            >
                              View All Packages
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.submenu?.length) {
                  const dropdownOpen = isDropdownOpen(index);

                  return (
                    <div
                      key={item.name}
                      ref={dropdownOpen ? openDropdownRef : null}
                      className="relative"
                      onMouseEnter={() => {
                        setOpenDropdownIndex(index);
                        setHoveredIndex(index);
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        aria-expanded={dropdownOpen}
                        className={`${navItemClass(highlighted)} inline-flex items-center gap-1`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            dropdownOpen ? 'rotate-180' : ''
                          } ${useSolidNav && highlighted ? 'text-gray-700' : ''}`}
                        />
                      </Link>
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[60] transition-all duration-200 ${
                          dropdownOpen
                            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                            : 'opacity-0 invisible translate-y-1 pointer-events-none'
                        }`}
                      >
                        <div
                          className="min-w-[260px] rounded-xl bg-white shadow-2xl border border-gray-100 py-1.5 overflow-hidden"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => closeDropdown()}
                              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                pathname === subItem.href || pathname?.startsWith(`${subItem.href}/`)
                                  ? 'bg-[#bd9245]/10 text-[#bd9245] font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#bd9245]'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleClick}
                    aria-current={active ? 'page' : undefined}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={navItemClass(highlighted)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side: Search + CTA */}
          <div className="hidden lg:flex items-center space-x-3 relative">
            <div className={`flex items-center transition-all duration-500 overflow-hidden ${isSearchOpen ? 'w-[400px] absolute right-32' : 'w-10'}`}>
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center w-full bg-white/80 backdrop-blur-xl rounded-full border border-[#bd9245]/30 shadow-sm px-2 overflow-hidden">
                  <Input
                    autoFocus
                    placeholder="Search trips, flights, or packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-none outline-none shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-800 h-10 w-full rounded-full"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-red-400 rounded-full h-8 w-8 ml-1 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className={`${useSolidNav ? 'text-gray-700' : 'text-white'} hover:bg-white/10`}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Link
              href="/contact"
              aria-current={isContactActive ? 'page' : undefined}
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
              className={`inline-flex h-10 items-center justify-center rounded-full px-6 text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                useSolidNav
                  ? isContactActive || contactHovered
                    ? 'bg-[#bd9245] text-white'
                    : 'bg-[#111827] text-white hover:bg-[#bd9245]'
                  : isContactActive || contactHovered
                    ? 'bg-white text-[#17303f]'
                    : 'bg-[#c8d8e2] text-[#17303f] hover:bg-white'
              }`}
            >
              Contact Us
            </Link>
            
            <Button
              onClick={() => openForm()}
              className={`${
                useSolidNav
                  ? 'bg-[#bd9245] hover:bg-[#a07835] text-gray-900'
                  : 'bg-transparent border border-white/35 text-white hover:bg-white/10 hover:text-white'
              } font-bold px-5 py-2 rounded-full shadow-none h-10 whitespace-nowrap text-[11px] uppercase tracking-[0.16em]`}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md ${useSolidNav ? 'text-gray-700' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.packageGroups?.length ? (
                  <div className="flex items-center rounded-lg overflow-hidden">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href, item.submenu, item.packageGroups) ? 'page' : undefined}
                      className={`flex-1 px-4 py-2 transition-colors ${
                        isActive(item.href, item.submenu, item.packageGroups)
                          ? 'bg-primary text-white font-bold rounded-l-lg'
                          : 'text-gray-700 hover:bg-gray-100 rounded-l-lg'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={mobilePackagesOpen ? 'Collapse packages' : 'Expand packages'}
                      aria-expanded={mobilePackagesOpen}
                      onClick={() => setMobilePackagesOpen((prev) => !prev)}
                      className={`px-3 py-2 rounded-r-lg transition-colors ${
                        isActive(item.href, item.submenu, item.packageGroups)
                          ? 'bg-primary text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          mobilePackagesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href, item.submenu, item.packageGroups) ? 'page' : undefined}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.href, item.submenu, item.packageGroups)
                        ? 'bg-primary text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}

                {item.packageGroups?.length && mobilePackagesOpen ? (
                  <div className="mt-1 space-y-1">
                    {item.packageGroups.map((group) => {
                      const groupOpen = mobileOpenGroups.includes(group.slug);
                      return (
                        <div key={group.slug}>
                          <div className="flex items-center">
                            <Link
                              href={getGroupPageHref(group.slug)}
                              className="flex-1 pl-6 pr-2 py-2 text-[11px] font-black uppercase tracking-widest text-[#bd9245] hover:text-[#a07835]"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {group.label}
                            </Link>
                            <button
                              type="button"
                              aria-label={groupOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
                              aria-expanded={groupOpen}
                              onClick={() => toggleMobileGroup(group.slug)}
                              className="px-3 py-2 text-[#bd9245] hover:bg-[#bd9245]/10 rounded-lg transition-colors"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  groupOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </div>

                          {groupOpen && (
                            <div className="space-y-1">
                              {getPackagesForGroup(group.slug, group.label).map((pkg) => {
                                const pkgSlug = generatePackageSlug(pkg.title, pkg._id);
                                const pkgHref = `/packages/${pkgSlug}`;
                                return (
                                  <Link
                                    key={pkg._id}
                                    href={pkgHref}
                                    className={`flex items-center gap-2 pl-10 pr-3 py-1.5 text-xs rounded-lg transition-colors ${
                                      pathname === pkgHref || pathname?.includes(pkg._id)
                                        ? 'text-[#bd9245] font-semibold bg-[#bd9245]/5'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#bd9245] shrink-0" />
                                    <span className="truncate">{pkg.title}</span>
                                  </Link>
                                );
                              })}
                              {group.items.map((sub) => {
                                const hasMinis = Boolean(sub.miniItems?.length);
                                const subOpen = mobileOpenSubs.includes(sub.slug);
                                return (
                                  <div key={sub.href}>
                                    <div className="flex items-center">
                                      <Link
                                        href={sub.href}
                                        className={`flex-1 pl-10 pr-2 py-2 text-sm rounded-lg transition-colors ${
                                          pathname === sub.href
                                            ? 'text-[#bd9245] font-semibold bg-[#bd9245]/5'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                      >
                                        {sub.label}
                                        {sub.isFuture ? ' (Future)' : ''}
                                      </Link>
                                      {hasMinis && (
                                        <button
                                          type="button"
                                          aria-label={subOpen ? `Collapse ${sub.label}` : `Expand ${sub.label}`}
                                          aria-expanded={subOpen}
                                          onClick={() => toggleMobileSub(sub.slug)}
                                          className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                          <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                              subOpen ? 'rotate-180' : ''
                                            }`}
                                          />
                                        </button>
                                      )}
                                    </div>
                                    {hasMinis &&
                                      subOpen &&
                                      sub.miniItems!.map((mini) => (
                                        <Link
                                          key={mini.slug}
                                          href={mini.href}
                                          className={`block pl-14 pr-4 py-1.5 text-xs rounded-lg transition-colors ${
                                            pathname === mini.href
                                              ? 'text-[#bd9245] font-semibold bg-[#bd9245]/5'
                                              : 'text-gray-500 hover:bg-gray-100'
                                          }`}
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {mini.label}
                                        </Link>
                                      ))}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {!item.packageGroups?.length &&
                  item.submenu?.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`block pl-8 pr-4 py-2 text-sm rounded-lg transition-colors ${
                      pathname === subItem.href || pathname?.startsWith(`${subItem.href}/`)
                        ? 'text-[#bd9245] font-semibold bg-[#bd9245]/5'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/contact"
              aria-current={isContactActive ? 'page' : undefined}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                isContactActive
                  ? 'bg-primary text-white font-bold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Button
              onClick={() => {
                openForm();
                setIsMenuOpen(false);
              }}
              className="w-full bg-[#bd9245] hover:bg-[#a07835] text-gray-900 font-bold mt-4"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarTravel;
