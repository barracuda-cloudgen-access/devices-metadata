# frozen_string_literal: true

# Usage example
#   ruby scrape_mac_models.rb > tmp.json
#   cat tmp.json | jq '.' | pbcopy

require 'json'
require 'nokogiri'
require 'open-uri'

MAC_MODELS_URI = 'https://everymac.com/systems/by_capability/mac-specs-by-machine-model-machine-id.html'

IDENTIFIER_XPATH = '//*[@id="contentcenter_specs_externalnav_noflip_3"]/a'
NAME_XPATH = '//*[@id="contentcenter_specs_externalnav_noflip_2"]/a'

PATTERNS_TO_EXCLUDE = %w[N/A*].freeze

parsed_html = Nokogiri::HTML.parse(
  # set user-agent as a trick to circunvent 403 forbidden status
  open(MAC_MODELS_URI, 'User-Agent' => 'foobar')
)

names = parsed_html.xpath(NAME_XPATH).map(&:text)
identifiers = parsed_html.xpath(IDENTIFIER_XPATH).map(&:text)

hash = names.zip(identifiers).to_h
filtered_hash = hash.delete_if { |_, v| v.start_with?(*PATTERNS_TO_EXCLUDE) }

new_hash = filtered_hash.map do |k, v|
  [v, { 'name' => k, 'category' => 'laptop', 'brand' => 'apple' }]
end

final_json = new_hash.to_h.to_json
puts final_json
