'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Check, X, FolderTree, Package as PackageIcon, MapPin } from 'lucide-react';
import { useCategoryLabels } from '@/contexts/CategoryLabelsContext';
import Image from 'next/image';

interface PackageItem {
  _id: string;
  title: string;
  packageCategory?: string;
  place?: string;
  location?: string;
  price?: number;
  duration?: string;
  images?: { url: string }[];
}

export default function DashboardCategoriesPanel() {
  const {
    navGroups,
    loading,
    renameGroupLabel,
    addGroup,
    deleteGroup,
  } = useCategoryLabels();

  const [selectedGroupSlug, setSelectedGroupSlug] = useState<string>('');
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupSlug, setEditingGroupSlug] = useState<string | null>(null);
  const [groupDraft, setGroupDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  // Fetch all packages to compute counts and show assigned packages
  const fetchPackages = async () => {
    try {
      setLoadingPackages(true);
      const res = await fetch('/api/packages');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPackages(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch packages for categories panel:', err);
    } finally {
      setLoadingPackages(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (navGroups.length > 0) {
      if (!selectedGroupSlug || !navGroups.some((g) => g.slug === selectedGroupSlug)) {
        setSelectedGroupSlug(navGroups[0].slug);
      }
    }
  }, [navGroups, selectedGroupSlug]);

  const selectedGroup = useMemo(
    () => navGroups.find((group) => group.slug === selectedGroupSlug) ?? navGroups[0],
    [navGroups, selectedGroupSlug]
  );

  const getPackageCountForGroup = (groupSlug: string, groupLabel: string) => {
    const cleanGroupSlug = groupSlug.toLowerCase().trim();
    const cleanGroupLabel = groupLabel.toLowerCase().trim();
    return packages.filter((pkg) => {
      const cat = (pkg.packageCategory || '').toLowerCase().trim();
      const place = (pkg.place || '').toLowerCase().trim();
      const loc = (pkg.location || '').toLowerCase().trim();
      return (
        cat === cleanGroupSlug ||
        cat === cleanGroupLabel ||
        place === cleanGroupSlug ||
        place === cleanGroupLabel ||
        loc === cleanGroupSlug ||
        loc === cleanGroupLabel ||
        (cleanGroupSlug === 'nepal' && (cat.includes('nepal') || place.includes('nepal') || loc.includes('nepal'))) ||
        (cleanGroupSlug === 'varanasi' && (cat.includes('varanasi') || cat.includes('kashi') || place.includes('varanasi') || loc.includes('varanasi')))
      );
    }).length;
  };

  const assignedPackages = useMemo(() => {
    if (!selectedGroup) return [];
    const cleanGroupSlug = selectedGroup.slug.toLowerCase().trim();
    const cleanGroupLabel = selectedGroup.label.toLowerCase().trim();
    return packages.filter((pkg) => {
      const cat = (pkg.packageCategory || '').toLowerCase().trim();
      const place = (pkg.place || '').toLowerCase().trim();
      const loc = (pkg.location || '').toLowerCase().trim();
      return (
        cat === cleanGroupSlug ||
        cat === cleanGroupLabel ||
        place === cleanGroupSlug ||
        place === cleanGroupLabel ||
        loc === cleanGroupSlug ||
        loc === cleanGroupLabel ||
        (cleanGroupSlug === 'nepal' && (cat.includes('nepal') || place.includes('nepal') || loc.includes('nepal'))) ||
        (cleanGroupSlug === 'varanasi' && (cat.includes('varanasi') || cat.includes('kashi') || place.includes('varanasi') || loc.includes('varanasi')))
      );
    });
  }, [selectedGroup, packages]);

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) return;
    setSaving(true);
    const ok = await addGroup(newGroupName.trim());
    setSaving(false);
    if (ok) {
      setNewGroupName('');
      fetchPackages();
    }
  };

  const handleSaveGroup = async (slug: string) => {
    if (!groupDraft.trim()) return;
    setSaving(true);
    const ok = await renameGroupLabel(slug, groupDraft.trim());
    setSaving(false);
    if (ok) {
      setEditingGroupSlug(null);
      fetchPackages();
    }
  };

  const handleDeleteGroup = async (slug: string, label: string) => {
    if (confirm(`Are you sure you want to delete the main category "${label}"?`)) {
      setSaving(true);
      const ok = await deleteGroup(slug);
      setSaving(false);
      if (ok) {
        fetchPackages();
      }
    }
  };

  if (loading) {
    return (
      <Card className="rounded-[40px] border-white shadow-sm">
        <CardContent className="p-12 text-center text-gray-500">Loading categories...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#bd9245]/10 rounded-2xl text-[#bd9245]">
            <FolderTree className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#111827] tracking-tight uppercase">Main Categories</h2>
            <p className="text-sm text-gray-500">Manage top-level destination &amp; tour categories</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Main Category List & Add */}
        <Card className="lg:col-span-5 rounded-[32px] border-white shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-6 pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-black uppercase tracking-tight">All Main Categories</CardTitle>
            <CardDescription>Click a category to see its assigned packages</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Add input */}
            <div className="flex gap-2">
              <Input
                placeholder="Add new main category (e.g. Dubai)"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddGroup();
                }}
                className="h-11 rounded-xl bg-gray-50/50 border-gray-200"
              />
              <Button
                type="button"
                onClick={handleAddGroup}
                disabled={saving || !newGroupName.trim()}
                className="shrink-0 h-11 px-4 rounded-xl bg-[#111827] hover:bg-black text-white font-bold"
              >
                <Plus className="h-4 w-4 mr-1.5" /> Add
              </Button>
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {navGroups.map((group) => {
                const isSelected = selectedGroup?.slug === group.slug;
                const isEditing = editingGroupSlug === group.slug;
                const pkgCount = getPackageCountForGroup(group.slug, group.label);

                return (
                  <div
                    key={group.slug}
                    className={`rounded-2xl border transition-all duration-200 p-4 ${
                      isSelected
                        ? 'border-[#bd9245] bg-[#bd9245]/5 shadow-sm ring-1 ring-[#bd9245]/20'
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/30'
                    }`}
                  >
                    {isEditing ? (
                      <div className="flex gap-2 items-center">
                        <Input
                          value={groupDraft}
                          onChange={(e) => setGroupDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveGroup(group.slug);
                            if (e.key === 'Escape') setEditingGroupSlug(null);
                          }}
                          className="h-9 rounded-lg bg-white"
                          autoFocus
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          disabled={saving}
                          onClick={() => handleSaveGroup(group.slug)}
                          className="h-9 w-9 text-green-600 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingGroupSlug(null)}
                          className="h-9 w-9 text-gray-400"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedGroupSlug(group.slug)}
                          className="text-left flex-1 min-w-0"
                        >
                          <div className="flex items-center gap-2">
                            <p className="font-black text-base text-gray-900 tracking-tight">{group.label}</p>
                            <Badge
                              variant="secondary"
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-[#bd9245] text-white'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {pkgCount} {pkgCount === 1 ? 'tour' : 'tours'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 font-mono">slug: {group.slug}</p>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Rename"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingGroupSlug(group.slug);
                              setGroupDraft(group.label);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg"
                            title="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGroup(group.slug, group.label);
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {navGroups.length === 0 && (
                <div className="p-8 text-center text-gray-400 border border-dashed rounded-2xl">
                  No main categories created yet. Use the input above to add one.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Packages in Selected Main Category */}
        <Card className="lg:col-span-7 rounded-[32px] border-white shadow-sm overflow-hidden bg-white">
          <CardHeader className="p-6 pb-4 border-b border-gray-100 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-black uppercase tracking-tight">
                  {selectedGroup ? selectedGroup.label : 'Packages'}
                </CardTitle>
                <Badge variant="outline" className="text-xs font-bold border-[#bd9245] text-[#bd9245]">
                  {assignedPackages.length} Assigned
                </Badge>
              </div>
              <CardDescription className="mt-1">
                Tour packages organized under the &quot;{selectedGroup?.label}&quot; category
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {loadingPackages ? (
              <div className="py-12 text-center text-gray-400">Loading assigned packages...</div>
            ) : assignedPackages.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                  <PackageIcon className="h-6 w-6" />
                </div>
                <p className="font-bold text-gray-700">No packages assigned to {selectedGroup?.label}</p>
                <p className="text-sm text-gray-400 mt-1 max-w-sm mx-auto">
                  When creating or editing a package, select &quot;{selectedGroup?.label}&quot; as the Main Category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {assignedPackages.map((pkg) => {
                  const coverImage = pkg.images?.[0]?.url || '/placeholder.jpg';
                  return (
                    <div
                      key={pkg._id}
                      className="flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 hover:border-[#bd9245]/30 hover:bg-gray-50/50 transition-all duration-200"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
                        <Image
                          src={coverImage}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm text-gray-900 truncate">{pkg.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          {pkg.duration && (
                            <span className="font-semibold text-gray-700">{pkg.duration}</span>
                          )}
                          {pkg.price ? (
                            <span className="font-black text-[#bd9245]">₹{pkg.price.toLocaleString('en-IN')}</span>
                          ) : null}
                          {(pkg.place || pkg.location) && (
                            <span className="inline-flex items-center gap-0.5 text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {pkg.place || pkg.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
