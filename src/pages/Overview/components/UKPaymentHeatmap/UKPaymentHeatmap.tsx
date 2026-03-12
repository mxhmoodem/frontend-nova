import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { ChevronDown } from 'lucide-react';
import {
  REGIONS,
  LAYER_CONFIG,
  LAYER_ORDER,
  type LayerKey,
} from './UKPaymentHeatmap.config';
import './UKPaymentHeatmap.css';

export function UKPaymentHeatmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const heatLayerRef = useRef<L.Layer | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  const [selectedLayer, setSelectedLayer] = useState<LayerKey>('contactless');
  const [mapReady, setMapReady] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const cfg = LAYER_CONFIG[selectedLayer];

  // Top-5 regions sorted descending by the active layer value
  const topRegions = useMemo(() => {
    return [...REGIONS]
      .sort((a, b) => {
        const av = cfg.invert ? 1 - a[cfg.key] : a[cfg.key];
        const bv = cfg.invert ? 1 - b[cfg.key] : b[cfg.key];
        return bv - av;
      })
      .slice(0, 5);
    // selectedLayer drives cfg, so only depend on selectedLayer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer]);

  // CSS gradient for the legend bar from the leaflet.heat gradient stops
  const legendGradient = useMemo(() => {
    const stops = Object.entries(cfg.gradient)
      .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
      .map(([stop, color]) => `${color} ${parseFloat(stop) * 100}%`)
      .join(', ');
    return `linear-gradient(to right, ${stops})`;
  }, [cfg]);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [54.5, -3.5],
        zoom: 5,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Positron — desaturated via CSS class applied below
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          subdomains: 'abcd',
          maxZoom: 19,
          opacity: 0.95,
        }
      ).addTo(map);

      // Invisible circle markers for hover & click interaction
      REGIONS.forEach((r) => {
        const marker = L.circleMarker([r.lat, r.lng], {
          radius: 14,
          fillOpacity: 0,
          stroke: false,
          interactive: true,
        }).addTo(map);

        marker.on('click', () => {
          map.flyTo([r.lat, r.lng], 9, { duration: 1.2 });
        });

        markersRef.current.push(marker);
      });

      mapRef.current = map;
      setMapReady(true);
    }, 120);

    return () => {
      clearTimeout(timer);
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // ── Swap heat layer when the selected layer (or map ready state) changes ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    // Remove the previous layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current);
      heatLayerRef.current = null;
    }

    const rawValues = REGIONS.map((r) =>
      cfg.invert ? 1 - r[cfg.key] : r[cfg.key]
    );
    const min = Math.min(...rawValues);
    const max = Math.max(...rawValues);
    const spread = max - min;

    const data: [number, number, number][] = REGIONS.map((r) => {
      const raw = cfg.invert ? 1 - r[cfg.key] : r[cfg.key];
      const v = spread > 0 ? (raw - min) / spread : 0;
      return [r.lat, r.lng, v];
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layer = (L as any).heatLayer(data, {
      radius: 20,
      blur: 10,
      minOpacity: 0.3,
      maxZoom: 12,
      max: 1.0,
      gradient: cfg.gradient,
    });

    layer.addTo(map);
    heatLayerRef.current = layer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayer, mapReady]);

  return (
    <div className="uk-heatmap">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="uk-heatmap__header">
        <div className="uk-heatmap__header-text">
          <h3 className="uk-heatmap__title">UK Payment Heatmap</h3>
          <p className="uk-heatmap__subtitle">{cfg.label}</p>
        </div>

        <div className="uk-heatmap__select-wrap">
          <select
            className="uk-heatmap__select"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value as LayerKey)}
            aria-label="Select payment data layer"
          >
            {LAYER_ORDER.map((key) => (
              <option key={key} value={key}>
                {LAYER_CONFIG[key].dropdownLabel}
              </option>
            ))}
          </select>
          <ChevronDown
            size={11}
            className="uk-heatmap__select-chevron"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Map ────────────────────────────────────────────── */}
      <div className="uk-heatmap__map-wrap">
        <div ref={containerRef} className="uk-heatmap__map" />
      </div>

      {/* ── Legend ─────────────────────────────────────────── */}
      <div className="uk-heatmap__legend">
        <div
          className="uk-heatmap__legend-bar"
          style={{ background: legendGradient }}
        />
        <div className="uk-heatmap__legend-labels">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* ── Top Regions Dropdown ───────────────────────────── */}
      <div className="uk-heatmap__regions">
        <div className="uk-heatmap__select-wrap">
          <select
            className="uk-heatmap__select uk-heatmap__select--regions"
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              if (e.target.value) {
                const region = topRegions.find(
                  (r) => r.name === e.target.value
                );
                if (region) {
                  mapRef.current?.flyTo([region.lat, region.lng], 9, {
                    duration: 1.2,
                  });
                }
              }
            }}
            aria-label="Select top region"
          >
            <option value="">Top Regions</option>
            {topRegions.map((r, i) => (
              <option key={r.name} value={r.name}>
                #{i + 1} {r.name} — {cfg.fmt(r[cfg.key])}
              </option>
            ))}
          </select>
          <ChevronDown
            size={11}
            className="uk-heatmap__select-chevron"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
