.PHONY: ping-prod
.ONESHELL: ping-prod
ping-prod: 
	@curl -fs -o /dev/null https://cs144-s25-mariusg.uw.r.appspot.com && echo "✅ index.html is available" || echo "❌ index.html is down"
	@curl -fs -o /dev/null https://cs144-s25-mariusg.uw.r.appspot.com/event_filter_bg.536898ea.wasm && echo "✅ wasm is available" || echo "❌ wasm is down"